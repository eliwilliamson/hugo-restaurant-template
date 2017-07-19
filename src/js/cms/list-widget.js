import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

// I'm going to assume that the desired value is an array of pairs of
// strings. It doesn't change much in the implementation either way.
// The value will therefore look like this:
//
// [
//   [ "Link Label", "https://link.value" ],
//   [ "Link Label", "https://link.value" ],
//   [ "Link Label", "https://link.value" ],
//   ...
// ]

// This is the editing component for an individual Link. It's just two
// side-by-side inputs.
class LinkControl extends React.Component {

  changeName = (e) => {
    const { value, onChange } = this.props;
    // Keep in mind that all collection props are Immutable.js
    // objects, not POJOs
    const newValue = List([e.target.value, value.get(1)]);
    onChange(newValue);
  }

  changeLink = (e) => {
    const { value, onChange } = this.props;
    const newValue = List([value.get(0), e.target.value]);
    onChange(newValue);
  }

  handleKeyPress = (e) => {
    const { onNewLink } = this.props;
    if (e.key === "Enter") {
      onNewLink();
    }
  }

  render() {
    const [name, link] = this.props.value;
    return (<div className={styles.linkContainer}>
      <input
        className={styles.linkName}
        value={name || ""}
        onChange={this.changeName}
        onKeyPress={this.handleKeyPress}
      />
      <input
        className={styles.linkLink}
        value={link || ""}
        onChange={this.changeLink}
        onKeyPress={this.handleKeyPress}
      />
    </div>);
  }
}

// This is the container which implements the list functionality. Once
// my work on repeatable widgets is done, this should no longer be
// required.
export default class LinksControl extends React.Component {

  // This function creates a change handler for a given link, which
  // itself takes the new value and calls the change handler with the
  // new list of links.
  getChangeHandler = i => newValue => {
    const { onChange, value } = this.props;
    onChange(value.set(i, newValue));
  }

  // Just adds a new item
  getNewLinkHandler = i => () =>
    this.props.onChange(this.props.value.insert(i + 1, List(["", ""])));

  render() {
    const { value } = this.props;
    return (<div>
      {value.map((val, i) => <LinkControl
        key={i}
        value={val}
        onChange={this.getChangeHandler(i)}
        onNewLink={this.getNewLinkHandler(i)}
      />)}
    </div>);
  }
}
}