import React from 'react'

import UserSecrets from "../components/UserSecrets"
import PartnerSecrets from "../components/PartnerSecrets"

export default function Secrets(props) {
    const name=props.name 
    const lastName=props.lastName 
    const pronounce=props.pronounce
    const partnerName=props.partnerName 
    const partnerLastName=props.partnerLastName 
    const partnerPronounce=props.partnerPronounce
    const partnerID=props.partnerID
    const connected=props.connected
    return (
        <div>
            < PartnerSecrets name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
            < UserSecrets name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
        </div>
    )
}
