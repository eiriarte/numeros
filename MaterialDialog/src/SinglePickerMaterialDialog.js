import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableNativeFeedback, View, Image, ListView, Platform }
  from 'react-native';
import MaterialDialog from './MaterialDialog';

import colors from './colors';

export default class SinglePickerMaterialDialog extends Component {

  constructor(props) {
    super(props);

    const { items, selectedItem } = props;

    const rows = items.map(item => Object.assign({}, item, { selected: false }));

    let selectedIndex;
    if (selectedItem != null) {
      selectedIndex = rows.findIndex(item => item.value === selectedItem.value);

      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
        selected: true,
      });
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected,
    }).cloneWithRows(rows);

    this.state = { dataSource, rows, selectedIndex };
  }

  // TODO: Extract common logic with the constructor
  // Refreshing the dataSource when we refresh any prop (such as visible)
  componentWillReceiveProps(nextProps) {
    const { items, selectedItem } = nextProps;

    const rows = items.map(item => Object.assign({}, item, { selected: false }));

    let selectedIndex;
    if (selectedItem != null) {
      selectedIndex = rows.findIndex(item => item.value === selectedItem.value);

      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], {
        selected: true,
      });
    }

    const dataSource = this.state.dataSource.cloneWithRows(rows);

    this.setState({ dataSource, rows, selectedIndex });
  }

  onRowPress(rowID) {
    const rows = [...this.state.rows];
    const { selectedIndex } = this.state;

    if (selectedIndex != null) {
      rows[selectedIndex] = Object.assign({}, rows[selectedIndex], { selected: false });
    }
    rows[rowID] = Object.assign({}, rows[rowID], { selected: true });

    const dataSource = this
      .state
      .dataSource
      .cloneWithRows(rows);

    this.setState({ dataSource, rows, selectedIndex: rowID });
  }

  renderRow = (row, sectionID, rowID) => {
    let checkImg, checkTint, componentType;

    if (row.selected) {
      checkImg = require('../img/android_radio_checked.png');
      checkTint = this.props.colorAccent;
      componentType = 'radiobutton_checked';
    } else {
      checkImg = require('../img/android_radio_unchecked.png');
      checkTint = 'rgba(0, 0, 0, 0.54)';
      componentType = 'radiobutton_unchecked';
    }

    return (
      <TouchableNativeFeedback accessibilityComponentType={componentType}
        key={row.value} onPress={() => this.onRowPress(rowID)}>
        <View
          style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Image source={checkImg} style={{ tintColor: checkTint }}/>
          </View>
          <Text style={styles.rowText}>{row.label}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <MaterialDialog
        title={this.props.title}
        titleColor={this.props.titleColor}
        colorAccent={this.props.colorAccent}
        visible={this.props.visible}
        okLabel={this.props.okLabel}
        scrolled={this.props.scrolled}
        onOk={() => this.props.onOk({
          selectedItem: this
          .state
          .rows[this.state.selectedIndex],
        })}
        cancelLabel={this.props.cancelLabel}
        onCancel={() => {
          this
          .props
          .onCancel();
        }}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
      </MaterialDialog>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer:
  {
    marginRight: 16,
  },
  rowText:
  {
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      ios:  {
        fontWeight: '600'
      }
    }),
    color: colors.androidPrimaryTextColor,
    fontSize: 16,
  },
});

SinglePickerMaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.object,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  scrolled: PropTypes.bool,
};

SinglePickerMaterialDialog.defaultProps = {
  selectedItem: undefined,
  titleColor: undefined,
  colorAccent: colors.androidColorAccent,
  cancelLabel: undefined,
  okLabel: undefined,
  scrolled: false,
};
