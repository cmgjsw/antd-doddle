import React from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const DefaultEnums = [{
        value: 'M', label: '分钟',
    }, {
        value: 'H', label: '小时',
    }, {
        value: 'D', label: '天',
    }];
export default class InputWithUnit extends React.Component {
    constructor(props) {
        super(props);
        const { value = {}, defaultUnit } = this.props;
        this.state = {
            number: value.number,
            unit: value.unit || defaultUnit,
        };
        this.handleChange = this.handleChange.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    static getDerivedStateFromProps(nextProps, preState) {
        // Should be a controlled component.
        const { value = {} } = nextProps;
        if ('number' in value && preState.number !== value.number) {
            return Object.assign({}, (nextProps.value || {}));
        }
        return null;
    }
    handleChange(val, key) {
        const res = this.state;
        this.setState({
            [key]: val
        });
        this.trigger(Object.assign({}, res, { [key]: val }));
    }
    trigger(res) {
        const { onChange } = this.props;
        // 虽说Res的值已经用this.setState更新过，但方法是异步的，所以不能直接用this.state
        onChange && onChange(res);
    }
    render() {
        const { enums = DefaultEnums, inputProps = {}, selectProps = {} } = this.props;
        const time = this.state;
        return (React.createElement("span", null,
            React.createElement(Input, Object.assign({ value: time.number, onChange: e => this.handleChange(e.target.value, 'number'), style: { width: '55%', marginRight: '3%' }, placeholder: "\u8BF7\u8F93\u5165" }, inputProps)),
            React.createElement(Select, Object.assign({ value: time.unit, style: { width: '32%' }, allowClear: false, onChange: val => this.handleChange(val, 'unit') }, selectProps), enums.map(({ value, label }) => (React.createElement(Option, { key: value, value: value }, label))))));
    }
}
