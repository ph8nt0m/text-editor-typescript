import React, { useState } from 'react';

import {
  TextEditor,
  extractMentions,
  serialize,
  serializeHtml,
  validate,
} from './TextEditor';
import { exampleContents, mentions } from './fauxApi';

const contentSamples = ['c1', 'c2', 'c3', 'c4', 'c5'];

export default function App() {
  const [contentSample, setContentSample] = useState('c5');
  const [value, setValue] = useState(exampleContents[contentSample]);

  const handleChangeContent = (event) => {
    const updatedContentSample = event.target.value;
    setContentSample(updatedContentSample);
    setValue(exampleContents[updatedContentSample]);
  };

  const handlePost = async () => {
    alert('check console');
    console.log('=== Testing utils ===');
    console.log('AST:', value);
    console.log('serialize:', serialize(validate(value)));
    console.log('serializeHtml:', serializeHtml(validate(value)));
    console.log('extractMentions', extractMentions(value));
  };

  return (
    <div>
      <h1>
        <code>TextEditor</code>
      </h1>
      <p>
        Demo of a Slack-inspired text editor powered by{' '}
        <a href="https://github.com/ianstormtaylor/slate">slatejs</a> and{' '}
        <a href="https://github.com/uinix-js/uinix-ui">uinix-ui</a>.
      </p>
      <p>
        Source code is found in <code>./TextEditor</code> and assumes UI
        component dependencies that are implemented in <code>./ui</code>.
      </p>
      <h2>Demo</h2>
      <select onChange={handleChangeContent} value={contentSample}>
        {contentSamples.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <TextEditor
        key={contentSample}
        formats={[
          'bold',
          'italic',
          'underline',
          'code',
          'strikethrough',
          'h1',
          'h2',
          'pre',
          'blockquote',
          'ol',
          'ul',
          'left',
          'center',
          'right',
          'justify',
        ]}
        mentions={mentions}
        value={value}
        onChange={setValue}
        onPost={handlePost}
      />
      <h2>Debugger</h2>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
