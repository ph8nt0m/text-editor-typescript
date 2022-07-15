import { useFocused, useSelected } from 'slate-react';

import { Mention } from '../../ui';

export const MentionComponent = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  const label = element.children[0].text;
  // TODO: derive from element
  const tooltip = label;
  const type = 'user';

  return (
    <span {...attributes} contentEditable={false}>
      <Mention
        isActive={focused && selected}
        label={label}
        tooltip={tooltip}
        type={type}
      />
      {children}
    </span>
  );
};
