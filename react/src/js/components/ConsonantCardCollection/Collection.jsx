import React from 'react';
import Card from './Card';

// Fixtures;
const cardsData = [
    {
        id: '1',
        title: 'Nostrud exercitation ullamco laboris nisi ut aliquip ex ea ',
        label: 'Lorem ipsum',
        text: 'Nisi ut aliquip ex ea commodo consequat.',
    },
    {
        id: '2',
        title: 'Quisque sit amet euismod sem. Suspendisse dapibus consequat accumsan.',
        label: 'Curabitur feugiat',
        text: 'Morbi ac lobortis ante, vel pharetra augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris fermentum lorem felis, eget bibendum tellus accumsan vehicula.',
    },
    {
        id: '3',
        title: 'Donec malesuada neque at augue facilisis condimentum.',
        label: 'Lorem ipsum',
        text: 'Mauris feugiat, nisi eu pulvinar sagittis, quam tellus lobortis dui, vel euismod nunc purus quis augue. In eget rutrum dui, nec vulputate tellus. Nunc ornare varius urna eu auctor. Vivamus luctus suscipit lectus, nec ultrices est. Vivamus sed elementum dolor.',
    },
    {
        id: '4',
        title: 'Quisque pharetra, sapien a suscipit tincidunt, mi quam placerat leo',
        label: 'Class aptent',
        text: 'Integer faucibus nec elit sed pretium. Nunc et dui eu sapien convallis faucibus. Vivamus eu libero viverra, pulvinar enim id, iaculis tortor.',
    },
];

export default class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: cardsData,
        };
    }

    render() {
        return (
            <div className="consonant-card-collection">
                {this.state.cards.map(card => <Card key={card.id} {...card} />)}
            </div>
        );
    }
}
