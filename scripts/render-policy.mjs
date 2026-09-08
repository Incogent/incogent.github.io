// Small, escaped renderer for our controlled policy Markdown (not general Markdown).
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function inline(text) {
  // Tokenize source text before escaping, so generated anchors are never relinked.
  const tokens = /\[([^\x5d]+)]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|<(https?:\/\/[^\s<>]+|[^\s<>@]+@[^\s<>@]+)>|\*\*([^*]+)\*\*|https?:\/\/[^\s<>*]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  let html = '', position = 0;
  for (const match of text.matchAll(tokens)) {
    html += escape(text.slice(position, match.index));
    const [token, label, destination, autolink, strong] = match;
    if (strong !== undefined) {
      html += '<strong>' + inline(strong) + '</strong>';
    } else {
      const value = destination || autolink || token.replace(/[.,;:!?]+$/, '').replace(/\)+$/, closing => {
        const opens = (token.match(/\(/g) || []).length;
        const closes = (token.match(/\)/g) || []).length;
        return closing.slice(0, Math.max(0, closing.length - Math.max(0, closes - opens)));
      });
      const href = /^(https?:\/\/|mailto:)/i.test(value) ? value : 'mailto:' + value;
      html += '<a href="' + escape(href) + '">' + escape(label || value) + '</a>';
      if (!destination && !autolink) html += escape(token.slice(value.length));
    }
    position = match.index + token.length;
  }
  return html + escape(text.slice(position));
}
export function renderPolicy(markdown, expectedTitle = '# Incogent Privacy Policy') {
  const lines = markdown.replace(/\r\n/g, '\n').trim().split('\n');
  if (lines.shift() !== expectedTitle) throw new Error('Unexpected policy title');
  if (/REVIEW DRAFT|Publication review item|Proposed effective date/.test(markdown)) throw new Error('Policy is not final');
  const html = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const heading = /^(#{2,3}) (.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const id = heading[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
      html.push(`<h${level} id="${id}">${inline(heading[2])}</h${level}>`); i++; continue;
    }
    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push('<li>' + inline(lines[i++].replace(/^\d+\. /, '')) + '</li>');
      html.push('<ol>' + items.join('\n') + '</ol>'); continue;
    }
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) items.push(`<li>${inline(lines[i++].slice(2))}</li>`);
      html.push(`<ul>${items.join('\n')}</ul>`); continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++].split('|').slice(1, -1).map(cell => cell.trim()));
      if (!rows[1]?.every(cell => /^-+$/.test(cell))) throw new Error('Unexpected policy table');
      html.push(`<div class="policy-table"><table><caption>General retention periods</caption><thead><tr>${rows[0].map(cell => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`); continue;
    }
    const paragraph = [];
    while (i < lines.length && lines[i].trim()) {
      const current = lines[i++];
      paragraph.push(inline(current.trimEnd()) + (current.endsWith('  ') ? '<br>' : ' '));
    }
    html.push(`<p>${paragraph.join('').trim()}</p>`);
  }
  return html.join('\n');
}
