import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { IProfile } from "../../../app/models/profile"
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: IProfile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {
    const styles = {
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Image style={attendee.following ? styles : null} bordered size="mini" circular src={attendee.image || "/assets/user.png"} />
                    </List.Item>
                }>
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})
