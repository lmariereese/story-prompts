import React from 'react';
import {RichUtils} from 'draft-js';

const Toolbar = ({inlineStyle, blockStyle, editorState}) => {
  const inline = [
    {value: 'Bold', style: 'BOLD'},
    {value: 'Italic', style: 'ITALIC'},
    {value: 'Underline', style: 'UNDERLINE'}
  ];
  const block = [
    {value: 'h1', block: 'header-one'},
    {value: 'h2', block: 'header-two'},
    {value: 'h3', block: 'header-three'}
  ];
  const currentStyle = editorState.getCurrentInlineStyle();
  const currentBlock = RichUtils.getCurrentBlockType(editorState);

  return (
    <div className="toolbar">
      {inline.map(btn => {
        return (
          <button
            type="button"
            key={btn.style}
            className={currentStyle.has(btn.style) ? 'active' : ''}
            onMouseDown={event => inlineStyle(event, btn.style)}
          >
            {btn.value}
          </button>
        );
      })}
      {block.map(btn => {
        return (
          <button
            type="button"
            key={btn.block}
            className={currentBlock === btn.block ? 'active' : ''}
            onMouseDown={event => blockStyle(event, btn.block)}
          >
            {btn.value}
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
