import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { __CLIENT__ } from '../../../utils';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker, setDateLocalizer, Multiselect } from 'react-widgets';

moment.locale('en');
momentLocalizer();

if (__CLIENT__) window.moment = moment;

export const renderIconInput = ({input, error, classNameOuter='', placeholder='', autoComplete='true', icon, type, cname}) => (
	<div className={`input-group ${cname ? `mb-${cname}` : ''} ${classNameOuter}`}>
		<div className="input-group-prepend">
			<span className="input-group-text">
				<i className={icon}></i>
			</span>
		</div>
		<input {...input} autoComplete={autoComplete} type={type} className="form-control" placeholder={placeholder} />
        {error && <p className="text-danger">{error}</p>}
	</div>
);

export const renderInput = ({input, error, classNameInput='', classNameOuter='', type='text', label='', cname=0, autoComplete='true', id='', placeholder=''}) => (
	<div className={`input-group ${cname ? `mb-${cname}` : ''} ${classNameOuter}`}>
		<label>{label}</label>
		<input {...input} autoComplete={autoComplete} type={type} className={`${classNameInput} form-control`} id={id} placeholder={placeholder} />
        {error && <p className="text-danger">{error}</p>}
	</div>
);

export const renderTextarea = ({input, error, classNameInput='', classNameOuter='', label, id='', placeholder='Enter text...', defaultValue=''}) => {
    return (
        <div className={`input-group ${classNameOuter}`}>
            <label>{label}</label>
            <textarea {...input} type="text" className={`form-control ${classNameInput}`} id={id} placeholder={placeholder}/>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

// eslint-disable global-require
export const renderQuillTextarea = ({input, error, custom, label, onChanges}) => {
	const { default: RichTextEditor } = require('react-rte');
	return (
		<div className={`input-group f-column`}>
			<label className="w-100">{label}</label>
            <RichTextEditor className="w-100" value={custom} onChange={onChanges} />
            {error && <p className="text-danger">{error}</p>}
		</div>
	);
};
// eslint-enable global-require

export const renderDateInput = ({input, error, label, date, onChanges, onToggles, placeholder="Please enter a date and time"}) => {
    console.info(date);
    const dateObject = moment.utc((new Date(date)));
    console.info(dateObject);
    return (
        <div className="f-column w-100">
            <label className="w-100">{label}</label>
            <DateTimePicker
                editFormat={'MMM Do, YYYY hh:mm a'}
                defaultValue={dateObject}
                value={dateObject}
                onChange={onChanges}
                onToggle={onToggles}
                date
                time
                format={'MMM Do, YYYY hh:mm a'}
                {...input}
            />
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export const renderMultiselectInput = ({input, error, label, cname=1, onChanges, data, value, placeholder='Please select or search possibilities'}) => (
    <div className={`f-column w-100 mb-${cname}`}>
        <label className="w-100">{label}</label>
        <Multiselect
            data={data}
            value={value}
            defaultValue={value}
            onChange={onChanges}
            placeholder={placeholder}
        />
        {error && <p className="text-danger">{error}</p>}
    </div>
);

export const textInput = ({input, error, placeholder="Leave a comment..."}) => (
    <Fragment>
        <input {...input} type="text" placeholder={placeholder} className="form-control"/>
        {error && <p className="text-danger">{error}</p>}
    </Fragment>
);

export const textareaInput = ({input, error, placeholder="Leave a comment... ", className=''}) => (
    <Fragment>
	    <textarea {...input} type="text" placeholder={placeholder} className={`form-control ${className}`}/>
        {error && <p className="text-danger">{error}</p>}
    </Fragment>
);

export const radioInput = ({input, error, label, checked=false, click}) => (
	<div className="radio" onClick={click}>
		<label>{label}</label>
		<input {...input} checked={checked} type="radio" style={{marginRight: '5px'}} />
        {error && <p className="text-danger">{error}</p>}
	</div>
);

export const checkBoxInput = ({input, error, errorClassName, LoaderComponent=() => <span />, loader=null, classNameLabel='', classNameInput='', classNameOuter='',  label, checked=false, click}) => (
	<div className={`check f-column ${classNameOuter}`} onClick={click}>
        <div className="w-100 f-row float-left">
            <label className={classNameLabel}>{label}</label>
            {!loader ? <input className={classNameInput} {...input} checked={checked} type="checkbox" style={{marginRight: '5px'}} />
            : <LoaderComponent />}
        </div>
        {error && <p className={`text-danger ${errorClassName}`}>{error}</p>}
	</div>
);

export const selectInput = ({ input, error, classNameOuter='', classNameOption='', classNameSelect='', options=[], label, value }) => (
	<div className={`select ${classNameOuter}`}>
		<label>{label}</label>
		<select {...input} className={classNameSelect} value={value}>
            <option />
            {options.length > 0 && options.map((e, i) => (
                <option key={i} selected={e.selected} className={classNameOption} value={e.value}>
                    {e.label}
                </option>
            ))}
		</select>
        {error && <p className="text-danger">{error}</p>}
	</div>
);
