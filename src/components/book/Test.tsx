import React, {FunctionComponent, useState} from 'react'
import {Button, Input, Select, TimePicker, Typography} from "antd";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {isDebug, tg} from "../../utils/TelegramWebApp";
import {getTestDates, getTestDurations, getTestRooms} from "../../utils/TestData";
import {bookRoom} from "../../utils/BookingApi";
import {getUsersEmailByTgId} from "../../utils/Firebase";

dayjs.extend(customParseFormat);
const Test: FunctionComponent = () => {
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    const [, setRoomSelected] = useState(false);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<undefined | null | Dayjs>(null);
    const [range, setRange] = useState<number | null>(null);
    const [room, setRoom] = useState<string | null>(null);


    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });

    const showPopup = useShowPopup();
    // const [popupState, setPopupState] = useState<
    //     Pick<ShowPopupParams, 'title' | 'message'>
    //   >({
    //     title: 'title',
    //     message: 'message',
    //   });


    return (
        <div id={"test-book"}>

            <Typography.Title>Test Date</Typography.Title>
            <Select size={"large"} onSelect={(value: string) => {
                setDateSelected(true);
                console.log("On Select (Date)")
                setDate(value);
                setTime(null);
                setRange(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} value={date} options={getTestDates()}>
            </Select>

            <Typography.Title>Test Time of Start</Typography.Title>
            <TimePicker inputReadOnly={true}
                        format={"HH:mm"}
                        minuteStep={5} size={"large"} onSelect={(value) => {
                setTimeSelected(true);
                console.log("On Select (Time)");
                setTime(value);
                setRange(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={!dateSelected} value={time}/>

            <Typography.Title>Test Duration of Booking</Typography.Title>
            <Select options={getTestDurations()} size={"large"} onSelect={(value) => {
                setRangeSelected(true);
                console.log("On Select (Range)");
                setRange(value);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={(!(dateSelected && timeSelected))} value={range}/>

            <Typography.Title>Test Room</Typography.Title>
            <Select options={getTestRooms()} size={"large"} onSelect={(value) => {
                setRoomSelected(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
                setRoom(value);
            }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room}/>

            <Typography.Title>Test Title</Typography.Title>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="by-room-input"
            />

            {buttonState?.show && isDebug && <Button onClick={() => {
                let completeStartDate = new Date(date as string);
                let timeISO = new Date(time?.toISOString() as string);
                completeStartDate.setUTCHours(timeISO.getUTCHours(), timeISO.getUTCMinutes(), 0, 0);
                let completeEndDate = new Date(completeStartDate.toISOString());
                completeEndDate.setMinutes(completeEndDate.getMinutes() + (range as number));

                console.log(`Title - ${title}`)
                console.log(`Date - ${completeStartDate.toLocaleDateString(["en-US"], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}`)
                console.log(`Time - ${time}`)
                console.log(`Duration - ${range} minutes`)
                console.log(`Room - ${room}`)

                console.log(`Start - ${completeStartDate.toISOString()}`)
                console.log(`End - ${completeEndDate.toISOString()}`)

                // bookRoom(room as string, title, completeStartDate.toISOString(), completeEndDate.toISOString(),
                //     "s.sviatkin@innopolis.university").then(r => console.log(r));


                //completeStartDate.setHours((time?.toISOString() as number), time?.minute(), 0, 0);
                //let completeEndDate = new Date(completeStartDate.toISOString())


            }} type="primary">Test Book</Button>}


            <div>{buttonState?.show && <MainButton {...buttonState} onClick={() => {
                // TODO change to tg.showConfirm
                showPopup({
                    title: `Confirm ${title}`,
                    message: `Book ${room} at ${time} for ${range} minutes?`,
                    buttons: [
                        {
                            id: "ok",
                            type: 'ok',
                        },
                        // {
                        //     type: 'close',
                        // },
                        {
                            id: "cancel",
                            type: 'destructive',
                            text: 'Cancel',
                        },
                    ],
                }).then(id => {
                    if (id === "ok") {
                        let completeStartDate = new Date(date as string);
                        let timeISO = new Date(time?.toISOString() as string);
                        completeStartDate.setUTCHours(timeISO.getUTCHours(), timeISO.getUTCMinutes(), 0, 0);
                        let completeEndDate = new Date(completeStartDate.toISOString());
                        completeEndDate.setMinutes(completeEndDate.getMinutes() + (range as number));

                        console.log(getUsersEmailByTgId())
                        bookRoom(room as string, title, completeStartDate.toISOString(), completeEndDate.toISOString(),
                            "s.sviatkin@innopolis.university").then(r => console.log(r));
                        // TODO : make a book
                        setTimeout(() => tg.close(), 500);
                    }
                })
            }}/>}</div>

        </div>
    )
}

export default Test;