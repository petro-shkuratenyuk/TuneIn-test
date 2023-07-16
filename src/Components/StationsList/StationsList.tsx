import React, {useEffect, useState} from "react";

import {StationType} from "../../types";
import {Station} from "../Station";
import {getStations} from "../../dataServices";
import {LoadingAnimation} from "../LoadingAnimation";
import {ErrorMessage} from "../ErrorMessage";

import {MESSAGES} from "../../constants";

import './StationsList.scss'

export const StationsList: React.FC = () => {
    const [error, setError] = useState<undefined|string>()
    const [playingStation, setPlayingStation] = useState<string>()
    const [stations, setStations] = useState<null|StationType[]>(null)

    useEffect(() => {
        getStations()
            .then(newStations => setStations(newStations.sort((a: StationType, b: StationType) => (b.popularity - a.popularity))))
            .catch((requestError) => {
            setError(requestError.message || MESSAGES.STATIONS_LOADING_ERROR)
        })
    }, [])

    const onStationPlay = (id:string) => {
        if(id === playingStation) return;

        setPlayingStation(id)
    }

    if(error) {
        return <ErrorMessage message={error} />
    }

    if(stations === null) {
        return <LoadingAnimation />
    }

    return (
        <>
            <ul className="stations-list">
                {stations.map(station => (
                    <Station
                        station={station}
                        onPlay={onStationPlay}
                        play={playingStation === station.id}
                        key={station.id}
                    />
                ))}
            </ul>

        </>
    )
};