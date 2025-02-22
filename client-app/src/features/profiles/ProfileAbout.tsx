import { observer } from "mobx-react-lite"
import { useStore } from "../../app/stores/store"
import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout() {
    const { profileStore } = useStore();
    const { isCurrentUser, profile } = profileStore;
    const [editMode, setEditMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.value.displayName}`} />
                    {isCurrentUser && (
                        <Button
                            onClick={() => setEditMode(!editMode)}
                            floated='right'
                            basic
                            content={editMode ? 'Cancel' : 'Edit Profile'}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ?
                        <ProfileEditForm setEditMode={setEditMode} />
                        :
                        <span style={{ whiteSpace: 'pre-wrap' }}>{profile.value.bio}</span>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})
