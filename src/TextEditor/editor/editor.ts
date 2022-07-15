import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { withMentions } from '../mention';

export const editor = withMentions(withReact(withHistory(createEditor())));
