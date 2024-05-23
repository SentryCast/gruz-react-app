import React, { useEffect } from "react";
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";
import { useState, useCallback } from "react";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Отправить данные"
        })
    }, [])

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }

        tg.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input 
            className={'input'} 
            type="text" 
            placeholder={"Страна"}
            value={country}
            onChange={onChangeCountry}
            />
            <input 
            className={'input'} 
            type="text" 
            placeholder={"Улица"}
            value={street}
            onChange={onChangeStreet}
            />
            <select value={subject} className={"select"} onChange={onChangeSubject}>
                <option value={"physical"}>Физ. лицо</option>
                <option value={"legal"}>Юр. лицо</option>
            </select>
        </div>
    )
}

export default Form;