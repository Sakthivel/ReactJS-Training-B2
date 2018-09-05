function CapsuleApp(currState, action) {
  
  switch(action.type) {
    case 'GET_USERNAME':
      return Object.assign({}, {
        username: action.username
      })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChattingSection',
        username: action.username
      })

    // case 'GET_ROOM':
    //   return Object.assign({}, {
    //     username: action.username
    //   })

    // case 'SET_ROOM':
    //   return Object.assign({}, {
    //     screen: 'ChattingSection',
    //     username: action.username
    //   })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;