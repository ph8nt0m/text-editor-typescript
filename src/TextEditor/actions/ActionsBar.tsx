import React from 'react';

import { Icon, IconList, Layout, Tooltip } from '../../ui';

export const ActionsBar = ({
  enableFormat,
  onMention,
  onPost,
  onToggleFormat,
}) => {
  return (
    <Layout align="center" justify="space-between" spacing={2}>
      <IconList>
        <Icon icon="mention" tooltip="Mention someone" onClick={onMention} />
        <Icon
          icon="format"
          tooltip={enableFormat ? 'Hide formatting' : 'Show formatting'}
          onClick={onToggleFormat}
        />
      </IconList>
      <div>
        <Tooltip tooltip="Send message">
          <button onClick={onPost}>Post</button>
        </Tooltip>
      </div>
    </Layout>
  );
};
