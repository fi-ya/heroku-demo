function layout(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Check in question examples">
      <link rel='stylesheet' href='styles.css'>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi&display=swap" rel="stylesheet">
      <title>${title}</title>
    </head>
    <body>
      ${content}
    </body>
    </html>`;
}

module.exports = layout;
