import React, { useState } from 'react';
import { Text, View } from 'react-native';

const WidthText= ({ style, children }) => {
  const [showEllipsis, setShowEllipsis] = useState(false);

  // Function to handle text layout
  const handleTextLayout = (event) => {
   c
    // Check if the width exceeds 230
    if (width > 230) {
      setShowEllipsis(true);
    }
  };

  return (
    <View>
      <Text
        style={style}
        numberOfLines={1}
        onLayout={handleTextLayout}>
        {children}
      </Text>
      {showEllipsis && '...'}
    </View>
  );
};

export default WidthText;
