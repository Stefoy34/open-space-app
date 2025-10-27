/**
 * @TODO: Define all the actions (creator) for the talks state
 */

import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_TALKS: "RECEIVE_TALKS",
  ADD_TALK: "ADD_TALK",
  TOGGLE_LIKE_TALK: "TOGGLE_LIKE_TALK",
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispacth) => {
    dispacth(showLoading());
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispacth(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
    dispacth(hideLoading());
  };
}

function asyncToggleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    dispatch(showLoading());
    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};
