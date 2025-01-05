import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx"; // if there are problems with the photo - we should use this and the logs of profile.value, the ideal solution is to remove the .value.

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    // Log the profile object and profile image
    // console.log('Profile:', toJS(profile));
    // console.log('Profile Image:', toJS(profile.value.image));

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.value.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.value.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={5} />
                        <Statistic label='Following' value={42} />
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated="move">
                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button fluid color='teal' content='Following' />
                        </Reveal.Content>
                        <Reveal.Content hidden style={{ width: '100%' }}>
                            <Button fluid basic color={true ? 'red' : 'green'} content={true ? 'Unfollow' : 'Follow'} />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})

