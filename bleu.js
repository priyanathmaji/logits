/**
 * BLEU Score Calculator Logic
 */

// --- Utilities ---

function tokenize(text) {
    // Simple tokenization: lowercase, remove punctuation (basic), split by whitespace
    // Note: For a robust NLP tool, we'd want better tokenization, but this suffices for the demo.
    return text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .split(" ");
}

function getNGrams(tokens, n) {
    const ngrams = {};
    if (tokens.length < n) return ngrams;

    for (let i = 0; i <= tokens.length - n; i++) {
        const gram = tokens.slice(i, i + n).join(" ");
        ngrams[gram] = (ngrams[gram] || 0) + 1;
    }
    return ngrams;
}

// --- Core BLEU Logic ---

function calculatePrecision(candidateTokens, referenceTokenLists, n) {
    const candidateNGrams = getNGrams(candidateTokens, n);
    const totalCandidateNGrams = Object.values(candidateNGrams).reduce((a, b) => a + b, 0);

    if (totalCandidateNGrams === 0) return 0;

    let clippedCountSum = 0;

    for (const gram in candidateNGrams) {
        const countInCandidate = candidateNGrams[gram];

        // Find max count of this n-gram in any single reference
        let maxCountInRefs = 0;
        for (const refTokens of referenceTokenLists) {
            const refNGrams = getNGrams(refTokens, n);
            const countInRef = refNGrams[gram] || 0;
            if (countInRef > maxCountInRefs) {
                maxCountInRefs = countInRef;
            }
        }

        // Clip the count
        clippedCountSum += Math.min(countInCandidate, maxCountInRefs);
    }

    return clippedCountSum / totalCandidateNGrams;
}

function calculateBP(c, r) {
    if (c > r) {
        return 1.0;
    } else {
        return Math.exp(1 - (r / c));
    }
}

function findClosestRefLength(c, refLengths) {
    let closestRefLen = refLengths[0];
    let minDiff = Math.abs(c - closestRefLen);

    for (const rLen of refLengths) {
        const diff = Math.abs(c - rLen);
        if (diff < minDiff) {
            minDiff = diff;
            closestRefLen = rLen;
        } else if (diff === minDiff) {
            // If tie, choose shorter one (standard BLEU convention varies, but user prompt said:
            // "in the case of two equally-close reference translation lengths, choose r* as the shorter one")
            if (rLen < closestRefLen) {
                closestRefLen = rLen;
            }
        }
    }
    return closestRefLen;
}

function calculateBLEU() {
    // 1. Get Inputs
    const candidateText = document.getElementById('candidateText').value;
    const referenceTextRaw = document.getElementById('referenceText').value;
    const maxN = parseInt(document.getElementById('maxN').value);

    const weights = [
        parseFloat(document.getElementById('w1').value),
        parseFloat(document.getElementById('w2').value),
        parseFloat(document.getElementById('w3').value),
        parseFloat(document.getElementById('w4').value)
    ];

    // 2. Parse & Tokenize
    const candidateTokens = tokenize(candidateText);
    const referenceLines = referenceTextRaw.split('\n').filter(line => line.trim() !== '');
    const referenceTokenLists = referenceLines.map(tokenize);

    if (candidateTokens.length === 0 || candidateTokens[0] === "") {
        alert("Please enter a candidate translation.");
        return;
    }
    if (referenceTokenLists.length === 0) {
        alert("Please enter at least one reference translation.");
        return;
    }

    // 3. Calculate Precisions (p_n)
    const precisions = [];
    for (let n = 1; n <= 4; n++) {
        if (n <= maxN) {
            precisions.push(calculatePrecision(candidateTokens, referenceTokenLists, n));
        } else {
            precisions.push(0); // Placeholder, won't be used if weights are 0 for this N
        }
    }

    // 4. Calculate Brevity Penalty (BP)
    const c = candidateTokens.length;
    const refLengths = referenceTokenLists.map(tokens => tokens.length);
    const rStar = findClosestRefLength(c, refLengths);
    const bp = calculateBP(c, rStar);

    // 5. Calculate Final Score
    // BLEU = BP * exp( sum( w_n * log(p_n) ) )

    // Smoothing: If p_n is 0, use p_{n-1} (for n > 1)
    const smoothedPrecisions = [...precisions];
    for (let i = 1; i < maxN; i++) {
        if (smoothedPrecisions[i] === 0) {
            smoothedPrecisions[i] = smoothedPrecisions[i - 1];
        }
    }

    let logSum = 0;

    for (let i = 0; i < maxN; i++) {
        const p = smoothedPrecisions[i];
        const w = weights[i];

        if (p > 0) {
            logSum += w * Math.log(p);
        } else {
            // If p1 is 0, or if smoothing didn't help (e.g. p1=0), then score is 0.
            logSum = -Infinity;
            break;
        }
    }

    let bleu = 0;
    if (logSum !== -Infinity) {
        bleu = bp * Math.exp(logSum);
    }

    // --- Render Results ---

    document.getElementById('bleuScore').textContent = bleu.toFixed(4);

    // Render Calculation Formula
    // Format: BLEU = BP × exp(sum) = ...
    const sumStr = logSum === -Infinity ? "-∞" : logSum.toFixed(4);
    const bpStr = bp.toFixed(4);
    const formulaHtml = `BLEU = BP × exp(${sumStr}) <br>= ${bpStr} × e<sup>${sumStr}</sup> <br>≈ ${bleu.toFixed(4)}`;
    document.getElementById('bleuCalcFormula').innerHTML = formulaHtml;

    document.getElementById('cLen').textContent = c;
    document.getElementById('rLen').textContent = rStar;
    document.getElementById('bpValue').textContent = bp.toFixed(4);

    // Render BP Formula
    let bpFormulaHtml = '';
    if (c > rStar) {
        bpFormulaHtml = `c (${c}) > r* (${rStar}) implies BP = 1.0`;
    } else {
        bpFormulaHtml = `c (${c}) ≤ r* (${rStar}) implies BP = exp(1 - r*/c)<br>= exp(1 - ${rStar}/${c})<br>≈ ${bp.toFixed(4)}`;
    }
    document.getElementById('bpFormula').innerHTML = bpFormulaHtml;

    const precList = document.getElementById('precisionList');
    precList.innerHTML = '';

    for (let i = 0; i < maxN; i++) {
        const p = smoothedPrecisions[i];
        const w = weights[i];
        const logP = p > 0 ? Math.log(p) : -Infinity;
        const wLogP = p > 0 ? (w * logP) : 0;

        const row = document.createElement('div');
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '0.5fr 1fr 1fr 1fr';
        row.style.gap = '0.5rem';
        row.style.alignItems = 'center';
        row.style.fontSize = '0.9rem';

        let valText = precisions[i].toFixed(4);
        if (precisions[i] === 0 && smoothedPrecisions[i] > 0) {
            valText += ` <span style="font-size:0.75em; color:var(--text-secondary);">→ ${smoothedPrecisions[i].toFixed(4)}</span>`;
        }

        row.innerHTML = `
            <span>p${i + 1}</span>
            <span>${valText}</span>
            <span style="color: var(--text-secondary);">${logP === -Infinity ? '-∞' : logP.toFixed(4)}</span>
            <span style="font-weight: 600;">${wLogP.toFixed(4)}</span>
        `;
        precList.appendChild(row);
    }

    // Update Sum Display
    const sumDisplay = document.getElementById('logSumValue');
    if (logSum === -Infinity) {
        sumDisplay.textContent = "-∞";
    } else {
        sumDisplay.textContent = logSum.toFixed(4);
    }

    // --- Generate Breakdown ---
    generateBreakdown(candidateTokens, referenceTokenLists, maxN);
}

function generateBreakdown(candidateTokens, referenceTokenLists, maxN) {
    const container = document.getElementById('breakdownContainer');
    let html = '';

    // Show References N-grams
    html += `<div style="margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px dashed var(--border-color);">`;
    html += `<strong>Reference N-grams:</strong><br>`;
    referenceTokenLists.forEach((refTokens, idx) => {
        html += `<span style="color: var(--accent-color);">Reference ${idx + 1}:</span> "${refTokens.join(' ')}"<br>`;
        for (let n = 1; n <= maxN; n++) {
            const ngrams = getNGrams(refTokens, n);
            if (Object.keys(ngrams).length > 0) {
                html += `&nbsp;&nbsp;<em>${n}-grams:</em> ${Object.keys(ngrams).join(', ')}<br>`;
            }
        }
    });
    html += `</div>`;

    // Show Candidate N-grams & Matching
    html += `<div><strong>Candidate Analysis:</strong><br>`;
    html += `Candidate: "${candidateTokens.join(' ')}"<br><br>`;

    for (let n = 1; n <= maxN; n++) {
        html += `<strong>${n}-gram Precision (p${n}):</strong><br>`;
        const candidateNGrams = getNGrams(candidateTokens, n);
        const totalCandidateNGrams = Object.values(candidateNGrams).reduce((a, b) => a + b, 0);

        if (totalCandidateNGrams === 0) {
            html += `No ${n}-grams in candidate.<br><br>`;
            continue;
        }

        let clippedSum = 0;
        html += `<table style="width: 100%; text-align: left; font-size: 0.8rem; margin-bottom: 0.5rem;">`;
        html += `<tr><th>N-gram</th><th>Count (c)</th><th>Max Ref Count</th><th>Clipped</th></tr>`;

        for (const gram in candidateNGrams) {
            const countInCandidate = candidateNGrams[gram];

            // Find max count in refs
            let maxCountInRefs = 0;
            let refCountsStr = [];
            referenceTokenLists.forEach((refTokens, idx) => {
                const refNGrams = getNGrams(refTokens, n);
                const count = refNGrams[gram] || 0;
                if (count > maxCountInRefs) maxCountInRefs = count;
                refCountsStr.push(`r${idx + 1}=${count}`);
            });

            const clipped = Math.min(countInCandidate, maxCountInRefs);
            clippedSum += clipped;

            html += `<tr>`;
            html += `<td>"${gram}"</td>`;
            html += `<td>${countInCandidate}</td>`;
            html += `<td>${maxCountInRefs} <span style="color: var(--text-secondary); font-size: 0.7em;">(${refCountsStr.join(', ')})</span></td>`;
            html += `<td style="color: ${clipped > 0 ? 'var(--accent-color)' : 'inherit'}; font-weight: bold;">${clipped}</td>`;
            html += `</tr>`;
        }
        html += `</table>`;

        html += `Total Clipped Matches = ${clippedSum}<br>`;
        html += `Total Candidate ${n}-grams = ${totalCandidateNGrams}<br>`;
        html += `p${n} = ${clippedSum} / ${totalCandidateNGrams} = ${(clippedSum / totalCandidateNGrams).toFixed(4)}<br><br>`;
    }
    html += `</div>`;

    container.innerHTML = html;
}

function loadDemo() {
    document.getElementById('sourceText').value = "el amor todo lo puede";
    document.getElementById('referenceText').value = "love can always find a way\nlove makes anything possible";
    document.getElementById('candidateText').value = "the love can always do";
    document.getElementById('maxN').value = "2"; // Set to 2 as per user example for clarity

    calculateBLEU();
}

// --- Initialization ---

document.getElementById('btnCalculate').addEventListener('click', calculateBLEU);
document.getElementById('btnLoadDemo').addEventListener('click', loadDemo);

// Initial calculation on load
calculateBLEU();
