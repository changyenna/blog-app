import React, { useCallback, useState } from 'react';
import { Editor, Transforms, Text, Path, Range, Element, Node } from 'slate';
import {
  Editable,
  ReactEditor,
  useSelected,
  useFocused,
  useSlateStatic,
} from 'slate-react';
import { IconButton } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  List,
  TitleTwoTone,
  Link,
} from '@mui/icons-material';

function TextEditor(props) {
  const { editor, readOnly } = props;

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const renderElement = useCallback((props) => {
    const { element } = props;

    // console.log('Rendering: ', props.element.level);
    if (element.level === '1') {
      return;
    } else {
      return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // function getParentNodeType(editor, selection) {
  //   if (!!selection) {
  //     const [parentNode] = Editor.parent(editor, selection.focus.path);
  //     return parentNode.type;
  //   }
  //   return null;
  // }

  // React.useEffect(() => {
  //   const { selection } = editor;
  //   const parentNodeType = getParentNodeType(editor, selection);

  //   if (parentNodeType) {
  //     console.log('Parent Node Type:', parentNodeType);
  //   }
  //   formatTitle(editor);
  // }, [props.textPath, editor.selection]);

  function getParentNode(editor, selection) {
    if (!!selection) {
      const [parentNode] = Editor.parent(editor, selection.focus.path);
      return parentNode;
    }
    return null;
  }

  React.useEffect(() => {
    const { selection } = editor;
    const parentNode = getParentNode(editor, selection);

    if (parentNode) {
      console.log('Parent Node:', parentNode);
    }
    // formatTitle(editor, parentNode);
  }, [props.textPath, editor.selection]);

  const Leaf = (props) => {
    const editor = useSlateStatic();
    const { leaf } = props;

    const { selection } = editor;
    const parentNode = getParentNode(editor, selection);
    const parentNodeType = parentNode ? parentNode.type : null;

    const fontSize =
      parentNodeType === 'heading-three'
        ? '24px'
        : parentNodeType === 'heading-four'
        ? '20.8px'
        : '16px';

    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: leaf.bold ? 'bold' : 'normal',
          fontStyle: leaf.italic ? 'italic' : 'normal',
          textDecoration: leaf.underline ? 'underline' : 'none',
          fontSize: fontSize,
        }}
      >
        {props.children}
      </span>
    );
  };

  function ToolBar(props) {
    return <div className="bg-white mb-2">{props.children}</div>;
  }

  //FORMAT FUNCTIONS

  function formatTitle(editor, level) {
    const { selection } = editor;

    if (!selection) return;

    // define the new node type based on the heading level
    const newNodeType =
      level === 3
        ? 'heading-three'
        : level === 0
        ? 'paragraph'
        : level === 4
        ? 'heading-four'
        : 'paragraph';

    // iterate through the selected nodes and update their type
    for (const [node, path] of Editor.nodes(editor, {
      at: selection,
      match: (n) => Editor.isBlock(editor, n),
    })) {
      Transforms.setNodes(editor, { type: newNodeType }, { at: path });
    }
  }

  function formatItalic() {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic,
    });

    Transforms.setNodes(
      editor,
      { italic: !match },
      { match: (n) => Text.isText(n), split: true }
    );
  }

  function formatBold() {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold,
    });

    Transforms.setNodes(
      editor,
      { bold: !match },
      { match: (n) => Text.isText(n), split: true }
    );
  }

  function formatUnderlined() {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline,
    });

    Transforms.setNodes(
      editor,
      { underline: !match },
      { match: (n) => Text.isText(n), split: true }
    );
  }

  // function formatList(editor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: (n) => n.type === 'list',
  //   });
  //   Transforms.setNodes(
  //     editor,
  //     { type: match ? null : 'list' },
  //     { match: (n) => Editor.isBlock(editor, n) }
  //   );
  // }

  //ADDITIONAL FUNCTIONS

  const onKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    switch (event.key) {
      case '&': {
        editor.insertText('and');
        break;
      }

      case 'b': {
        formatBold();
        break;
      }

      case 'i': {
        formatItalic();
        break;
      }

      case 'u': {
        formatUnderlined();
        break;
      }

      case '`': {
        formatCode();
        break;
      }

      case 'l': {
        formatList();
        break;
      }

      case 'h': {
        // formatTitle(editor);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    // <div className="grid grid-cols-1 gap-4 mb-4">
    <div className="text-black flex flex-col w-full">
      <ToolBar>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatBold();
          }}
        >
          <strong>B</strong>
        </button>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatItalic();
          }}
        >
          <em>I</em>
        </button>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatUnderlined();
          }}
        >
          <p className="underline underline-offset-4">U</p>
        </button>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatTitle(editor, 0);
          }}
        >
          <p>Normal</p>
        </button>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatTitle(editor, 3);
          }}
        >
          <p>Heading 3</p>
        </button>
        <button
          className="bg-gray-200 px-2 py-1 mr-2 rounded focus:outline-none"
          onPointerDown={(e) => {
            formatTitle(editor, 4);
          }}
        >
          <p>Heading 4</p>
        </button>
      </ToolBar>
      <Editable
        readOnly={readOnly}
        onKeyDown={onKeyDown}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className="p-5 outline-none w-full rounded-lg h-auto focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        style={{
          padding: '1rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          resize: 'vertical',
          minHeight: '20rem',
        }}
      />
    </div>
  );
}

export default TextEditor;
