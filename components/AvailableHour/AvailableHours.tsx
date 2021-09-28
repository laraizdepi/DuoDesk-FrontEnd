import { FC, useState } from "react"
import { Calendar } from 'primereact/calendar';
import React from 'react';
interface HoursProps {
    initDay?: string
    finalDay?: string
    disable?: boolean
}

const AvailableHours: FC<HoursProps> = (props) => {


    const [date9, setDate9] = useState<Date | Date[] | undefined>(undefined);
    const [dateI, setDateI] = useState<Date | Date[] | undefined>(undefined);
    const [dateF, setDateF] = useState<Date | Date[] | undefined>(undefined);

    return (
        <>
            <table>
                <tr>
                    <th>
                        <label htmlFor="horaApertura">Hora de apertura: &nbsp;</label>
                    </th>
                    <th>
                        <Calendar id="horaApertura" value={dateI} onChange={(e) => setDateI(e.value)} timeOnly hourFormat="12" />
                    </th>
                </tr>
                <th>
                    <label htmlFor="horaCierre">Hora de cierre:</label>
                </th>
                <th>
                    <Calendar id="horaCierre" value={dateF} onChange={(e) => setDateF(e.value)} timeOnly hourFormat="12" />
                </th>

            </table>
            <div>

            </div >
            {/* <div className="p-fluid ">
                <div >
                    <label htmlFor="time12">Time / 12h</label>
                    <Calendar id="time12" value={date9} onChange={(e) => setDate9(e.value)} timeOnly hourFormat="12" />
                </div>
            </div> */}
        </>
    )
}

export default AvailableHours