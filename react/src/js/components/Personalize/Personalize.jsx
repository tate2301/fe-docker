import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import store, { preselectedTagsStorageKey } from '../store';
import { tagSelectionSavedAction } from '../actions';

class Personalize extends Component {
    constructor(props) {
        super(props);
        const preselectedTags = store.getState().personalizeReducer.tags;
        this.state = {
            selectedTags: preselectedTags,
            menuOpened: false,
            tagsSelected: false,
            titleText: this.props.unpersonalizedTitle,
            tagGroups: this.props.tagGroups,
        };
    }

    componentWillMount() {
        if (this.state.selectedTags.length) {
            this.setState({
                titleText: this.props.personalizedHeading,
                tagsSelected: true,
            });
        }
    }
    /* Keeping for reference */
    // async componentWillMount() {
    //     const jsonData = await DAO.getJsonData({
    //         pageName: 'archive',
    //         sortBy: 'name',
    //         pageNumber: 1,
    //         resultsPerPage: 3,
    //         activeFilters: [],
    //     });
    //
    //     this.setState({
    //         tagGroups: [
    //             ...Object.entries(jsonData.tags.create.tags)
    //                 .map(p1 => [...Object.entries(p1[1].tags)
    //                     .map(p2 => p2[1])]),
    //         ],
    //     });
    // }

    generateWrapperClass() {
        let className = 'personalize personalize__wrapper ';
        const { menuOpened, tagsSelected } = this.state;
        if (menuOpened) className += 'personalize__wrapper_opened ';
        if (tagsSelected) className += 'personalize__wrapper_changes_saved';
        return className;
    }

    handlePersonalizeBtnClick = (clickEvt) => {
        clickEvt.preventDefault();
        this.setState({ menuOpened: !this.state.menuOpened });
    };

    handleFilterClear = (clickEvt) => {
        clickEvt.preventDefault();
        this.setState({ selectedTags: [] });
    };

    handleCheckboxChange = (id) => {
        const selectedTags = [...this.state.selectedTags];
        if (selectedTags.includes(id)) {
            selectedTags.splice(selectedTags.indexOf(id), 1);
        } else {
            selectedTags.push(id);
        }

        this.setState({ selectedTags });
    };

    handleSaveChanges = (clickEvt) => {
        clickEvt.preventDefault();
        const titleText = this.props.personalizedHeading;
        this.setState({ menuOpened: false });

        if (this.state.selectedTags.length) {
            this.setState({
                tagsSelected: true,
                titleText,
            });
        }

        localStorage.setItem(preselectedTagsStorageKey, JSON.stringify(this.state.selectedTags));

        store.dispatch(tagSelectionSavedAction(this.state.selectedTags));
    };

    render() {
        const { titleText } = this.state;
        return (
            <div className={this.generateWrapperClass()}>
                <h1 className="personalize__main-title">{titleText}</h1>
                <div className="personalize__button-wrapper">
                    <button className="personalize__button" onClick={this.handlePersonalizeBtnClick}>
                        <img className="personalize__button-img" src="./img/cube.svg" width="22" alt="" />
                        <span className="personalize__button-text">{this.props.personalizeButtonText}</span>
                    </button>
                </div>
                <h3 className="personalize__main-text-subtitle">{this.props.personalizedSubheading}</h3>
                <div className="personalize__tag-group-section">
                    <ul className="personalize__tag-list">
                        {this.state.tagGroups.map(tagGroups => (
                            <div key={tagGroups.length} className="personalize__tag-list-group">
                                <ul
                                    className="personalize__tag-list-group-tags">
                                    {tagGroups.map(tag => (
                                        <li
                                            key={tag.id}
                                            className="personalize__tag-list-group-tag">
                                            <label className="personalize__tag-list-group-tag-label">
                                                <input
                                                    id={tag.id}
                                                    checked={
                                                        this.state.selectedTags.includes(tag.id)
                                                    }
                                                    className="personalize__tag-input"
                                                    onChange={() => {
                                                        this.handleCheckboxChange(tag.id);
                                                    }}
                                                    type="checkbox" />
                                                <span className="personalize__tag-text">{tag.title}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="personalize__tag-list-btns-wrapper">
                    <Fragment>
                        <button
                            className="personalize__tag-list-clear-btn"
                            onClick={this.handleFilterClear}>
                            {this.props.clearText}
                        </button>
                        <button
                            className="personalize__tag-list-apply-btn"
                            onClick={this.handleSaveChanges}>
                            {this.props.saveText}
                        </button>
                    </Fragment>
                </div>
            </div>
        );
    }
}

Personalize.propTypes = {
    saveText: PropTypes.string,
    clearText: PropTypes.string,
    personalizedSubheading: PropTypes.string,
    personalizeButtonText: PropTypes.string,
    personalizedHeading: PropTypes.string,
    unpersonalizedTitle: PropTypes.string,
    tagGroups: PropTypes.arrayOf(PropTypes.any),
};

Personalize.defaultProps = {
    saveText: '',
    clearText: '',
    personalizedSubheading: '',
    personalizeButtonText: '',
    personalizedHeading: '',
    unpersonalizedTitle: '',
    tagGroups: [],
};

export default Personalize;
