import React, {useState} from "react";

import {StationType} from "../../types";
import {ErrorMessage} from "../ErrorMessage";
import {MESSAGES} from "../../constants";

import './Station.scss'

interface OwnProps {
    station: StationType
    play: boolean,
    onPlay: (id: string) => void
}

export const Station: React.FC<OwnProps> = ({station, play, onPlay}) => {
    const [error, setError] = useState<undefined|string>()

    const onItemClick = () => {
        onPlay(station.id)
        setError(undefined)
    }

    const onError = () => {
        setError(MESSAGES.STATION_ERROR)
    }

    return (
        <li className="station-item" onClick={() => onItemClick()}>
            <span className="name">{station.name}</span>
            <span className="description">{station.description}</span>
            {station.tags?.length && (
                <ul className="tags">
                    {station.tags.map(tag => (
                        <li>{tag}</li>
                    ))}
                </ul>
            )}
            {error && play && (<ErrorMessage message={error} />)}
            {play && (
                <audio autoPlay={true} controls id={station.id} onError={onError}>
                    <source src={station.streamUrl} />
                    {MESSAGES.BROWNER_NO_AUDIO_TAG}
                </audio>
            )}
        </li>
    )
}