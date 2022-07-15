import { ContentAst } from './TextEditor';

export const exampleContents: Record<string, ContentAst> = {
  c1: [], // empty
  c2: [
    // simple
    {
      type: 'p',
      children: [
        {
          text: 'This is a simple paragraph',
        },
      ],
    },
  ],
  c3: [
    // simple + mark modifiers
    {
      type: 'p',
      children: [
        {
          text: 'This is a simple paragraph with ',
        },
        {
          text: 'modified',
          bold: true,
          code: true,
        },
        {
          text: ' and ',
        },
        {
          text: 'marked',
          bold: true,
          underline: true,
        },
        {
          text: ' text.',
        },
      ],
    },
  ],
  c4: [
    // nested
    {
      type: 'ul',
      children: [
        {
          type: 'li',
          children: [
            {
              text: 'first item',
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              text: 'second bolded item',
              bold: true,
            },
          ],
        },
      ],
    },
  ], // everything
  c5: [
    {
      type: 'p',
      children: [
        {
          text: 'This is editable ',
        },
        {
          text: 'rich',
          bold: true,
        },
        {
          text: ' text, ',
        },
        {
          text: 'much',
          italic: true,
        },
        {
          text: ' better than a ',
        },
        {
          text: '<textarea>',
          code: true,
        },
        {
          text: '!',
        },
      ],
    },
    {
      type: 'p',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        {
          text: 'bold',
          bold: true,
        },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'blockquote',
      children: [
        {
          text: 'A wise quote.',
        },
      ],
    },
    {
      type: 'p',
      align: 'center',
      children: [
        {
          text: 'Try it out for yourself!',
        },
      ],
    },
    {
      type: 'ol',
      children: [
        {
          type: 'li',
          children: [
            {
              text: 'Try mentioning ch',
            },
            {
              text: 'aracters, like ',
              bold: true,
            },
            {
              type: 'mention',
              entity: {
                id: 'm1',
                type: 'user',
              },
              children: [
                {
                  text: 'R2-D2',
                },
              ],
            },
            {
              text: ' or ',
              bold: true,
            },
            {
              type: 'mention',
              entity: {
                id: 'm2',
                type: 'user',
              },
              children: [
                {
                  text: 'Mace Windu',
                },
              ],
            },
            {
              text: '!',
              bold: true,
            },
          ],
          align: 'center',
        },
      ],
    },
  ],
};

export const mentions = [
  'Aayla Secura',
  'Adi Gallia',
  'Admiral Dodd Rancit',
  'Admiral Firmus Piett',
  'Admiral Gial Ackbar',
  'Admiral Ozzel',
  'Admiral Raddus',
  'Admiral Terrinald Screed',
  'Admiral Trench',
  'Admiral U.O. Statura',
  'Agen Kolar',
  'Agent Kallus',
  'Aiolin and Morit Astarte',
  'Aks Moe',
  'Almec',
  'Alton Kastle',
  'Amee',
  'AP-5',
  'Armitage Hux',
  'Artoo',
  'Arvel Crynyd',
  'Asajj Ventress',
  'Aurra Sing',
  'AZI-3',
  'Bala-Tik',
  'Barada',
  'Bargwill Tomder',
  'Baron Papanoida',
  'Barriss Offee',
  'Baze Malbus',
  'Bazine Netal',
  'BB-8',
  'BB-9E',
];
