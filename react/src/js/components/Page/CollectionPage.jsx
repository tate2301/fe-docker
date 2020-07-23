import React, { Fragment } from 'react';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import Personalize from '../Personalize/Personalize';
import FeaturedCard from '../FeaturedCard/FeaturedCard';
import CreateCardCollection from '../CreateCardCollection/Collection';

const tagGroups = [
    [
        {
            title: 'Design',
            id: 'create:topics/design',
            url: '/content/www/us/en/create/topics/design.html',
            tags: {},
        },
        {
            title: 'Photography',
            id: 'create:topics/photography',
            url: '/content/www/us/en/create/topics/photography.html',
            tags: {},
        },
        {
            title: 'UI & UX',
            id: 'create:topics/ui-and-ux',
            url: '/content/www/us/en/create/topics/ui-and-ux.html',
            tags: {},
        },
        {
            title: 'Video',
            id: 'create:topics/video',
            url: '/content/www/us/en/create/topics/video.html',
            tags: {},
        },
        {
            title: 'Illustration',
            id: 'create:topics/illustration',
            url: '/content/www/us/en/create/topics/illustration.html',
            tags: {},
        },
    ],
    [
        {
            title: 'How-tos',
            id: 'create:types/how-tos',
            url: '/content/www/us/en/cloud/types/how-tos.html',
            tags: {},
        },
        {
            title: 'Live streams',
            id: 'create:types/live-streams',
            url: '/content/www/us/en/cloud/types/live-streams.html',
            tags: {},
        },
        {
            title: 'Challenges',
            id: 'create:types/challenges',
            url: '/content/www/us/en/cloud/types/perspectives.html',
            tags: {},
        },
        {
            title: 'Inspiration',
            id: 'create:types/inspiration',
            url: '/content/www/us/en/cloud/types/inspiration.html',
            tags: {},
        },
        {
            title: 'Interviews',
            id: 'create:types/interviews',
            url: '/content/www/us/en/cloud/types/interviews.html',
            tags: {},
        },
        {
            title: 'Free stuff',
            id: 'create:types/free-stuff',
            url: '/content/www/us/en/cloud/types/free-stuff.html',
            tags: {},
        },
        {
            title: 'Jobs',
            id: 'create:types/jobs',
            url: '/content/www/us/en/cloud/types/jobs.html',
            tags: {},
        },
    ],
    [
        {
            title: 'Beginner',
            id: 'create:skills/beginner',
            url: '/content/www/us/en/cloud/skills/beginner.html',
            tags: {},
        },
        {
            title: 'Intermediate',
            id: 'create:skills/intermediate',
            url: '/content/www/us/en/cloud/skills/intermediate.html',
            tags: {},
        },
        {
            title: 'Advanced',
            id: 'create:skills/advanced',
            url: '/content/www/us/en/cloud/skills/advanced.html',
            tags: {},
        },
    ],
];

const CollectionPage = () => (
    <Fragment>
        <GlobalNavigation />
        <Personalize
            tagGroups={tagGroups}
            unpersonalizedTitle="Watch, learn, play, and interact."
            personalizedHeading="Welcome to your Create Space"
            personalizedSubheading="We’ve pulled the best content for you based on your interests."
            personalizeButtonText="What are you into?"
            clearText="Clear options"
            saveText="Save and apply" />
        <FeaturedCard />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/how-tos"
            collectionHeader="How-tos" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/challenges"
            collectionHeader="Challenges" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/interviews"
            collectionHeader="Interviews" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/jobs"
            collectionHeader="Jobs" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/live-streams"
            collectionHeader="Live Streams" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/inspiration"
            collectionHeader="Inspiration" />
        <CreateCardCollection
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            primaryTagId="create:types/free-stuff"
            collectionHeader="Free Stuff" />
    </Fragment>
);

export default CollectionPage;
