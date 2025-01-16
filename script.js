document.getElementById('convertButton').addEventListener('click', () => {
    const articles = document.querySelectorAll('article');
    let output = '';

    // Gender-Regeln
    const genderRules = [
        { regex: /\bBenutzer\b/g, replacement: 'Benutzer*innen' },
        { regex: /\bMitarbeiter\b/g, replacement: 'Mitarbeiter*innen' },
        { regex: /\bRedakteure\b/g, replacement: 'Redakteur*innen' },
        { regex: /\bFahrer\b/g, replacement: 'Fahrende' },
        { regex: /\bKollegen\b/g, replacement: 'Kolleg*innen' },
        { regex: /\bKunden\b/g, replacement: 'Kund*innen' }
    ];

    // Texte gendern
    articles.forEach(article => {
        let text = article.innerText;

        // Sicherheit: Entfernen von potenziell gefährlichem HTML/JS-Code
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Gender-Regeln anwenden
        genderRules.forEach(rule => {
            text = text.replace(rule.regex, rule.replacement);
        });

        output += `${text}\n\n`;
    });

    // Ausgabe
    document.getElementById('outputText').textContent = output;
});

document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const content = document.querySelectorAll('main p'); // Select paragraphs in the main content
    let found = false;

    // Clear previous highlights
    content.forEach(paragraph => {
        paragraph.innerHTML = paragraph.textContent; // Reset to original text
    });

    // Search Funktion
    if (query) {
        content.forEach(paragraph => {
            const text = paragraph.textContent.toLowerCase();
            if (text.includes(query)) {
                found = true;

                // Highlight the matched text
                const regex = new RegExp(`(${query})`, 'gi');
                paragraph.innerHTML = paragraph.textContent.replace(regex, '<mark>$1</mark>');
            }
        });

        if (!found) {
            alert('Kein Ergebnis gefunden.');
        }
    } else {
        alert('Bitte geben Sie einen Suchbegriff ein.');
    }
});

