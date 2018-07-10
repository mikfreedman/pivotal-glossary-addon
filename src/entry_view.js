export class EntryView {
  constructor(entry, entryRepository, document) {
    this.entry = entry;
    this.document = document;
    this.entryRepository = entryRepository;
  }

  get html()
  {
    var output = [];
    output.push(this.entry.headword);

    if(this.entry.expansion)
      output.push(` (${this.entry.expansion})`);
    if(this.entry.definition) {
      output.push("<hr>");
      output.push(this.entry.definition);
    }

    if(this.entry.links) {
      output.push('<hr><b>links</b><ul>');
      this.entry.links.forEach((link) => {
        output.push(`<li><a target='_blank' href='${link}'>${link}</a></li>`);
      });
      output.push('</ul>');
    }

    if(this.entry.see_also) {
      output.push('<hr><b>see also</b>:');
      output.push(this.entry.see_also.map((seeAlso) => {
        return (`<a target='_blank' href='${this.entryRepository.newNotFoundEntry(seeAlso).url}'>${seeAlso}</a>`);
      }).join(', '));
    }

    const template = this.document.createElement('div');
    template.innerHTML = output.join("\n");
    return template;
  }
}

