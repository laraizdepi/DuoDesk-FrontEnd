import React, { FC } from "react"
import style from './VIew.module.sass'

interface Offices {
    id: string,
    name: string,
    description: string,
    host: any,
    isActive: boolean,
    generalAmenities: string[]
    spaces: {
        nameSpace: string,
        typeSpace: string,
        capacitySpace: number,
        availableSpace: number,
        hourPrice: number,
        dayPrice: number,
        weekPrice: number,
        monthPrice: number,
        nameAmenities: string[],
        imagesUrls: string[],
        booking?: any
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}

const Schedule: FC<{ office: Offices }> = (props) => {
    const office = props.office
    const tConvert = (time: any) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    const startWeek = tConvert(office.days.[0].startHour)
    const endWeek = tConvert(office.days.[0].endHour)

    let dateSat = 'No abierto'
    let dateSun = 'No abierto'

    if (office.days.length === 2) {

        const startSat = tConvert(office.days.[1].startHour)
        const endSat = tConvert(office.days.[1].endHour)

        dateSat = `${startSat} - ${endSat}`

    } else if (office.days.length === 3) {

        const startSat = tConvert(office.days.[1].startHour)
        const endSat = tConvert(office.days.[1].endHour)

        const startSun = tConvert(office.days.[2].startHour)
        const endSun = tConvert(office.days.[2].endHour)

        dateSat = `${startSat} - ${endSat}`
        dateSun = `${startSun} - ${endSun}`
    }

    return (
        <div className={style.Schedule}>
            <div className={style.ScheduleTitle}>
                <p>Horario</p>
            </div>
            <div className={style.ScheduleContainer}>
                <div className={style.SchedulePeriod}>
                    <p className={style.ScheduleSubTitle}>Lunes - Viernes</p>
                    <p className={style.ScheduleDate}>{startWeek} - {endWeek}</p>
                </div>
                <div className={style.SchedulePeriod}>
                    <p className={style.ScheduleSubTitle}>Sabados</p>
                    <p className={style.ScheduleDate}>{dateSat}</p>
                </div>
                <div className={style.SchedulePeriod}>
                    <p className={style.ScheduleSubTitle}>Domingos</p>
                    <p className={style.ScheduleDate}>{dateSun}</p>
                </div>
            </div>
        </div>

    )

}

export default Schedule