import React, {useCallback, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import FastImage from '../FastImage';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import styles from '../..//helper/globalStyles';

const CustomCultureView = props => {
  const {asset, question} = props;
  const {width} = useWindowDimensions();
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 2); //to check the text is more than 4 lines or not
  }, []);

  // const onLayout = e => {
  //     return e.nativeEvent.layout.width;
  // };

  const mixedStyles = {
    whiteSpace: 'normal',
    color: 'gray',
  };

  const systemFonts = [...defaultSystemFonts, 'Mysuperfont'];

  return (
    <>
      <View style={styles.customCultureView}>
        <View style={styles.customCultureImageView}>
          <FastImage source={asset} style={styles.customCultureImage} />
        </View>
        <View style={[styles.customCultureQuestionView]}>
          <RenderHtml
            enableExperimentalMarginCollapsing={true}
            contentWidth={width}
            source={{html: question}}
            // tagsStyles={{
            //     ul: { fontSize: 14, lineHeight: 20 },
            //     li: styles.globInTextDescrp,
            //     img: { display: 'none' },
            // }}
            list
            systemFonts={systemFonts}
            tagsStyles={{
              k: styles.customCultureQuestion,
              a: styles.customCultureQuestion,
              p: styles.customCultureQuestion,
            }}
          />
        </View>
      </View>
      <View style={styles.customCultureViewBorder} />
    </>
  );
};

export default CustomCultureView;
