import React, { useState } from 'react';
import { Text } from 'react-native';

const EllipsisText = ({ style, children }) => {
  const [showEllipsis, setShowEllipsis] = useState(false);

  // Function to handle text layout
  const handleTextLayout = (event) => {
    const { lines } = event.nativeEvent;
  
    // Check if the number of lines exceeds 2
    if (lines.length > 2) {
      setShowEllipsis(true);
    }
  
  };

  let textContent = children;

  if (typeof children === 'string') {
    textContent = children.substring(0, 12);
  }

  return (
    <Text
      style={style}
      numberOfLines={2}
      onTextLayout={handleTextLayout}>
      {textContent}{showEllipsis ? '...' : ''}
    </Text>
  );
};

export default EllipsisText;
