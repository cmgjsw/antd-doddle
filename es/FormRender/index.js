import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox, Col } from 'antd';
import { formItemLayout as layout, DATE_FORMAT, DATE_TIME_FORMAT } from '../utils';
import renderType from './renderType';
var FormItem = Form.Item;
var Option = Select.Option;
var RadioGroup = Radio.Group;
var RangePicker = DatePicker.RangePicker;
var TextArea = Input.TextArea;
var CheckboxGroup = Checkbox.Group;

var defaultAction = function defaultAction() {};

var getContainer = function getContainer(className) {
  return function () {
    return className ? document.getElementsByClassName(className)[0] : document.body;
  };
};

var isUndefind = function isUndefind(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
};

var handleDisabledDate = function handleDisabledDate(currentDate) {
  return currentDate && currentDate > moment().endOf('day');
}; // 用于接受一个从接口获取到的枚举数组


var getParamFromProps = function getParamFromProps(key, props) {
  return props[key] || [];
};

var WrapperDefault = function WrapperDefault(props) {
  return React.createElement(Col, {
    span: props.span || 12
  }, props.children);
};

export default function (constProps) {
  var _constProps$formItemL = constProps.formItemLayout,
      formItemLayout = _constProps$formItemL === void 0 ? layout : _constProps$formItemL,
      containerName = constProps.containerName,
      getFieldDecorator = constProps.getFieldDecorator,
      require = constProps.require,
      _constProps$Wrapper = constProps.Wrapper,
      Wrapper = _constProps$Wrapper === void 0 ? WrapperDefault : _constProps$Wrapper,
      _constProps$withWrap = constProps.withWrap,
      defaultWrap = _constProps$withWrap === void 0 ? false : _constProps$withWrap;
  return function FormRender(props) {
    var field = props.field,
        _props$data = props.data,
        data = _props$data === void 0 ? {} : _props$data,
        _props$wrapProps = props.wrapProps,
        wrapProps = _props$wrapProps === void 0 ? {} : _props$wrapProps;
    var _field$type = field.type,
        type = _field$type === void 0 ? 'input' : _field$type,
        key = field.key,
        name = field.name,
        _field$style = field.style,
        style = _field$style === void 0 ? {
      width: '100%'
    } : _field$style,
        _field$required = field.required,
        required = _field$required === void 0 ? require || false : _field$required,
        _field$allowClear = field.allowClear,
        allowClear = _field$allowClear === void 0 ? true : _field$allowClear,
        placeholder = field.placeholder,
        defaultValue = field.defaultValue,
        _field$disable = field.disable,
        disable = _field$disable === void 0 ? false : _field$disable,
        _field$rules = field.rules,
        rules = _field$rules === void 0 ? [] : _field$rules,
        maxLength = field.maxLength,
        _field$isEnable = field.isEnable,
        isEnable = _field$isEnable === void 0 ? true : _field$isEnable,
        specialKey = field.specialKey,
        _field$onChange = field.onChange,
        onChange = _field$onChange === void 0 ? defaultAction : _field$onChange,
        format = field.format,
        withWrap = field.withWrap,
        _field$enums = field.enums,
        enums = _field$enums === void 0 ? [] : _field$enums,
        _field$seldomProps = field.seldomProps,
        seldomProps = _field$seldomProps === void 0 ? {} : _field$seldomProps,
        _field$isDynamic = field.isDynamic,
        isDynamic = _field$isDynamic === void 0 ? false : _field$isDynamic;
    var enumKey = field.enumKey || key;
    var content = null; // 如果这个节点不需要渲染，那么就直接返回null

    if (!isUndefind(props.isEnable, isEnable)) {
      return content;
    }

    switch (type) {
      // eslint-disable-next-line
      case 'input':
        // eslint-disable-next-line
        var patternRules = [{
          required: required,
          message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
        }, {
          pattern: /^\S.*\S$|^\S$/,
          message: '首尾不能含有空字符'
        }].concat(rules);
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: patternRules
        })(React.createElement(Input, Object.assign({
          type: "text",
          style: style,
          maxLength: maxLength,
          onChange: props.onChange || onChange,
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          disabled: disable && disable(data)
        }, seldomProps))));
        break;
      // eslint-disable-next-line

      case 'inputNumber':
        // min 设计了默认值的话，会导致表单为非必填时，会默认填上最小值；
        // eslint-disable-next-line
        var max = field.max,
            min = field.min,
            _field$precision = field.precision,
            precision = _field$precision === void 0 ? 0 : _field$precision,
            _field$step = field.step,
            step = _field$step === void 0 ? 1 : _field$step;
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(React.createElement(InputNumber, Object.assign({
          max: max,
          min: min,
          step: step,
          precision: precision,
          style: style,
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          onChange: props.onChange || onChange,
          disabled: disable && disable(data)
        }, seldomProps))));
        break;
      // eslint-disable-next-line

      case 'text':
        // eslint-disable-next-line
        var _field$minRows = field.minRows,
            minRows = _field$minRows === void 0 ? 2 : _field$minRows,
            _field$maxRows = field.maxRows,
            maxRows = _field$maxRows === void 0 ? 6 : _field$maxRows;
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout, {
          className: "self-define-item"
        }), getFieldDecorator(key, {
          initialValue: data[key],
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(React.createElement(TextArea, Object.assign({
          type: "text",
          style: style,
          maxLength: maxLength || 300,
          placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(name),
          autosize: {
            minRows: minRows,
            maxRows: maxRows
          },
          onChange: props.onChange || onChange,
          disabled: disable && disable(data)
        }, seldomProps))));
        break;
      // eslint-disable-next-line

      case 'select':
        // eslint-disable-next-line
        var selectEnums = isDynamic ? getParamFromProps(enumKey, props) : props.enums || enums;
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(React.createElement(Select, Object.assign({
          style: style,
          placeholder: placeholder || '不限',
          allowClear: allowClear,
          disabled: disable && disable(data),
          onChange: props.onChange || onChange,
          getPopupContainer: getContainer(containerName)
        }, seldomProps), selectEnums.map(function (_ref) {
          var value = _ref.value,
              label = _ref.label;
          return React.createElement(Option, {
            key: value,
            value: value
          }, label);
        }))));
        break;
      // eslint-disable-next-line

      case 'radio':
        // eslint-disable-next-line
        var radioEnums = isDynamic ? getParamFromProps(enumKey, props) : props.enums || enums;
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(React.createElement(RadioGroup, Object.assign({
          options: radioEnums,
          disabled: disable && disable(data),
          onChange: props.onChange || onChange
        }, seldomProps))));
        break;
      // eslint-disable-next-line

      case 'check':
        // eslint-disable-next-line
        var checkEnums = isDynamic ? getParamFromProps(enumKey, props) : props.enums || enums;
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: isUndefind(data[key], defaultValue),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(React.createElement(CheckboxGroup, Object.assign({
          options: checkEnums,
          disabled: disable && disable(data),
          onChange: props.onChange || onChange
        }, seldomProps))));
        break;

      case 'datePicker':
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(key, {
          initialValue: data[key] && moment(data[key]),
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u9009\u62E9".concat(name)
          }].concat(rules)
        })(React.createElement(DatePicker, Object.assign({
          style: style,
          showTime: field.showTime || false,
          format: format || DATE_FORMAT,
          onChange: props.onChange || onChange,
          placeholder: placeholder || '请选择',
          disabled: disable && disable(data),
          getCalendarContainer: getContainer(containerName)
        }, seldomProps))));
        break;
      // eslint-disable-next-line

      case 'rangePicker':
        // eslint-disable-next-line
        var startKey = field.startKey,
            endKey = field.endKey,
            rangeKey = field.key,
            _field$disabledDate = field.disabledDate,
            disabledDate = _field$disabledDate === void 0 ? false : _field$disabledDate,
            _field$showTime = field.showTime,
            showTime = _field$showTime === void 0 ? false : _field$showTime; // eslint-disable-next-line

        var beginDate = data[startKey]; // eslint-disable-next-line

        var endDate = data[endKey]; // eslint-disable-next-line

        var rangeDate = beginDate && endDate ? [moment(beginDate), moment(endDate)] : [];
        content = React.createElement(FormItem, Object.assign({
          key: specialKey || key,
          label: name
        }, formItemLayout), getFieldDecorator(rangeKey, {
          initialValue: rangeDate,
          rules: [{
            required: required,
            message: placeholder || "\u8BF7\u8F93\u5165".concat(name)
          }].concat(rules)
        })(React.createElement(RangePicker, Object.assign({
          style: style,
          allowClear: allowClear,
          showTime: showTime,
          className: "search-range-picker",
          onChange: props.onChange || onChange,
          format: format || (showTime ? DATE_TIME_FORMAT : DATE_FORMAT),
          getCalendarContainer: getContainer(containerName),
          disabledDate: disabledDate ? function (currentDate) {
            return handleDisabledDate(currentDate);
          } : undefined
        }, seldomProps))));
        break;

      default:
        if (renderType[type]) {
          var render = renderType[type];
          content = React.createElement(FormItem, Object.assign({
            key: specialKey || key,
            label: name
          }, formItemLayout), getFieldDecorator(key, {
            initialValue: data[key],
            rules: [{
              required: props.required || required,
              message: placeholder
            }].concat(rules)
          })(render({
            field: field,
            props: props,
            data: data
          })));
        } else {
          console.error('type is not supported');
        }

        break;
    }

    return isUndefind(props.withWrap, isUndefind(withWrap, defaultWrap)) ? React.createElement(Wrapper, Object.assign({}, wrapProps), content) : content;
  };
}