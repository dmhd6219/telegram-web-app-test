import React, {useState} from 'react';
import {Button, Select, TimePicker, Typography} from 'antd';
import styled from "styled-components";
import { HashLink } from 'react-router-hash-link';

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
const disabledDateTime = () => ({
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledHours: () => range(7, 19),
    disabledMinutes: () => [1, 2, 3, 4, 5],
});

const HorizontalList = styled.div`

    width: 100%;
    display: flex;
    
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

`

const DateChoose = () => {
    const [choice, setChoice] = useState("time-start");
    const [day, setDay] = useState("20.06.2023");

    return (
        <div>
            <HorizontalList>
                <HashLink to="#sort-by-start-time">
                    <Button type="primary" onClick={() => setChoice("time-start")}>By Start Time</Button>
                </HashLink>

                <HashLink to='#sort-by-room'>
                    <Button type="primary" onClick={() => setChoice("room")}>By Room</Button>
                </HashLink>

                <HashLink to='#sort-by-end-time'>
                    <Button type="primary" onClick={() => setChoice("time-end")}>By End Time</Button>
                </HashLink>
            </HorizontalList>

            {choice === "time-start" &&
                <div id={"sort-by-start-time"}>
                    <Typography.Title>Select Date</Typography.Title>
                    <Select onChange={value => {
                        setDay(value);
                        console.log(day)
                    }}>
                        <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                        <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                        <Select.Option value="22.06.2022">22.06.2022</Select.Option>
                    </Select>

                    <Typography.Title>Select Time of Start</Typography.Title>
                    <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}
                                disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5}/>

                    <Typography.Title>Select Time of Booking</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '30', label: '30 Minutes'},
                        {value: '60', label: '1 Hour'},
                        {value: '90', label: '1.5 Hours'},
                        {value: '120', label: '2 Hours'},
                        {value: '150', label: '2.5 Hours'},
                        {value: '180', label: '3 Hours'},
                    ]}/>

                    <Typography.Title>Select Room</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '304', label: '304'},
                    ]}/>

                </div>}

            {choice === "room" &&
                <div id={"sort-by-room"}>
                    <Typography.Title>Select Room</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '304', label: '304'},
                        {value: '305', label: '305'}
                    ]}/>

                    <Typography.Title>Select Date</Typography.Title>
                    <Select onChange={value => setDay(value)}>
                        <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                        <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                        <Select.Option value="22.06.2022">22.06.2022</Select.Option>
                    </Select>

                    <Typography.Title>Select Time of Start</Typography.Title>
                    <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}
                                disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5}/>

                    <Typography.Title>Select Time of Booking</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '30', label: '30 Minutes'},
                        {value: '60', label: '1 Hour'},
                        {value: '90', label: '1.5 Hours'},
                        {value: '120', label: '2 Hours'},
                        {value: '150', label: '2.5 Hours'},
                        {value: '180', label: '3 Hours'},
                    ]}/>

                </div>}

            {choice === "time-end" &&
                <div id={"sort-by-end-time"}>
                    <Typography.Title>Select Date</Typography.Title>
                    <Select onChange={value => {
                        setDay(value);
                        console.log(day)
                    }}>
                        <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                        <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                        <Select.Option value="22.06.2022">22.06.2022</Select.Option>
                    </Select>

                    <Typography.Title>Select Time of Start</Typography.Title>
                    <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}
                                disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5}/>

                    <Typography.Title>Select Time of Booking</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '30', label: '30 Minutes'},
                        {value: '60', label: '1 Hour'},
                        {value: '90', label: '1.5 Hours'},
                        {value: '120', label: '2 Hours'},
                        {value: '150', label: '2.5 Hours'},
                        {value: '180', label: '3 Hours'},
                    ]}/>

                    <Typography.Title>Select Room</Typography.Title>
                    <Select onChange={value => setDay(value)} options={[
                        {value: '304', label: '304'},
                    ]}/>

                </div>}
        </div>
    )
}

export default DateChoose;
