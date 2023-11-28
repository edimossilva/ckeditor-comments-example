class CommentsAdapter {
  constructor( editor ) {
      this.editor = editor;
  }

  static get requires() {
      return [ 'CommentsRepository' ];
  }

  init() {
      const usersPlugin = this.editor.plugins.get( 'Users' );
      const commentsRepositoryPlugin = this.editor.plugins.get( 'CommentsRepository' );

      // Load the users data.
      for ( const user of appData.users ) {
          usersPlugin.addUser( user );
      }

      // Set the current user.
      usersPlugin.defineMe( appData.userId );

      // Set the adapter on the `CommentsRepository#adapter` property.
      commentsRepositoryPlugin.adapter = {
          addComment( data ) {
              console.log( 'Comment added', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              // When the promise resolves with the comment data object, it
              // will update the editor comment using the provided data.
              return Promise.resolve( {
                  createdAt: new Date()       // Should be set on the server side.
              } );
          },

          updateComment( data ) {
              console.log( 'Comment updated', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve();
          },

          removeComment( data ) {
              console.log( 'Comment removed', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve();
          },

          addCommentThread( data ) {
              console.log( 'Comment thread added', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve( {
                  threadId: data.threadId,
                  comments: data.comments.map( ( comment ) => ( { commentId: comment.commentId, createdAt: new Date() } ) ) // Should be set on the server side.
              } );
          },

          getCommentThread( data ) {
              console.log( 'Getting comment thread', data );

              // Write a request to your database here. The returned `Promise`
              // should resolve with the comment thread data.
              return Promise.resolve( {
                  threadId: data.threadId,
                  comments: [
                      {
                          commentId: 'comment-1',
                          authorId: 'user-2',
                          content: '<p>Are we sure we want to use a made-up disorder name?</p>',
                          createdAt: new Date(),
                          attributes: {}
                      }
                  ],
                  // It defines the value on which the comment has been created initially.
                  // If it is empty it will be set based on the comment marker.
                  context: {
                      type: 'text',
                      value: 'Bilingual Personality Disorder'
                  },
                  unlinkedAt: null,
                  resolvedAt: null,
                  resolvedBy: null,
                  attributes: {},
                  isFromAdapter: true
              } );
          },

          updateCommentThread( data ) {
              console.log( 'Comment thread updated', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve();
          },

          resolveCommentThread( data ) {
              console.log( 'Comment thread resolved', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve( {
                  resolvedAt: new Date(), // Should be set on the server side.
                  resolvedBy: usersPlugin.me.id // Should be set on the server side.
              } );
          },

          reopenCommentThread( data ) {
              console.log( 'Comment thread reopened', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve();
          },

          removeCommentThread( data ) {
              console.log( 'Comment thread removed', data );

              // Write a request to your database here. The returned `Promise`
              // should be resolved when the request has finished.
              return Promise.resolve();
          }

      };
  }
}
