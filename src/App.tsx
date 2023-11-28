import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build";

// CommentsAdapter;
class CommentsAdapter {
  editor: any;

  constructor(editor: any) {
    this.editor = editor;
  }

  static get requires() {
    return ["CommentsRepository"];
  }

  init() {
    const usersPlugin = this.editor.plugins.get("Users");
    const commentsRepositoryPlugin =
      this.editor.plugins.get("CommentsRepository");

    // Load the users data.
    for (const user of appData.users) {
      usersPlugin.addUser(user);
    }

    // Set the current user.
    usersPlugin.defineMe(appData.userId);

    // Set the adapter on the `CommentsRepository#adapter` property.
    commentsRepositoryPlugin.adapter = {
      addComment(data: any) {
        console.log("Comment added", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        // When the promise resolves with the comment data object, it
        // will update the editor comment using the provided data.
        return Promise.resolve({
          createdAt: new Date(), // Should be set on the server side.
        });
      },

      updateComment(data: any) {
        console.log("Comment updated", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      removeComment(data: any) {
        console.log("Comment removed", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      addCommentThread(data: any) {
        console.log("Comment thread added", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve({
          threadId: data.threadId,
          comments: data.comments.map((comment: any) => ({
            commentId: comment.commentId,
            createdAt: new Date(),
          })), // Should be set on the server side.
        });
      },

      getCommentThread(data: any) {
        console.log("Getting comment thread", data);

        // Write a request to your database here. The returned `Promise`
        // should resolve with the comment thread data.
        return Promise.resolve({
          threadId: data.threadId,
          comments: [
            {
              commentId: "comment-1",
              authorId: "user-2",
              content:
                "<p>Are we sure we want to use a made-up disorder name?</p>",
              createdAt: new Date(),
              attributes: {},
            },
          ],
          // It defines the value on which the comment has been created initially.
          // If it is empty it will be set based on the comment marker.
          context: {
            type: "text",
            value: "Bilingual Personality Disorder",
          },
          unlinkedAt: null,
          resolvedAt: null,
          resolvedBy: null,
          attributes: {},
          isFromAdapter: true,
        });
      },

      updateCommentThread(data: any) {
        console.log("Comment thread updated", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      resolveCommentThread(data: any) {
        console.log("Comment thread resolved", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve({
          resolvedAt: new Date(), // Should be set on the server side.
          resolvedBy: usersPlugin.me.id, // Should be set on the server side.
        });
      },

      reopenCommentThread(data: any) {
        console.log("Comment thread reopened", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      removeCommentThread(data: any) {
        console.log("Comment thread removed", data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },
    };
  }
}

const appData = {
  // Users data.
  users: [
    {
      id: "user-1",
      name: "Mex Haddox",
    },
    {
      id: "user-2",
      name: "Zee Croce",
    },
  ],

  // The ID of the current user.
  userId: "user-1",

  // Comment threads data.
  commentThreads: [
    {
      threadId: "thread-1",
      comments: [
        {
          commentId: "comment-1",
          authorId: "user-1",
          content: "<p>Are we sure we want to use a made-up disorder name?</p>",
          createdAt: new Date("09/20/2018 14:21:53"),
          attributes: {},
        },
        {
          commentId: "comment-2",
          authorId: "user-2",
          content: "<p>Why not?</p>",
          createdAt: new Date("09/21/2018 08:17:01"),
          attributes: {},
        },
      ],
      context: {
        type: "text",
        value: "Bilingual Personality Disorder",
      },
      unlinkedAt: null,
      resolvedAt: null,
      resolvedBy: null,
      attributes: {},
    },
  ],

  // Editor initial data.
  initialData: `<h2>
             <comment-start name="thread-1"></comment-start>
             Bilingual Personality Disorder
             <comment-end name="thread-1"></comment-end>
         </h2>
         <p>
             This may be the first time you hear about this made-up disorder but it actually isn’t so far from the truth.
             As recent studies show, the language you speak has more effects on you than you realize.
             According to the studies, the language a person speaks affects their cognition,
             behavior, emotions and hence <strong>their personality</strong>.
         </p>
         <p>
             This shouldn’t come as a surprise
             <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
             that different regions of the brain become more active depending on the activity.
             The structure, information and especially <strong>the culture</strong> of languages varies substantially
             and the language a person speaks is an essential element of daily life.
         </p>`,
};
class App extends Component {
  commentExample =
    'They are <comment-start name="b39dd790"></comment-start>awesome <comment-end name="b39dd790"></comment-end>.';

  render() {
    return (
      <div className="App">
        <div className="Editor"></div>
        <h2>Using CKEditor&nbsp;5 build in React</h2>

        <CKEditor
          editor={ClassicEditor}
          data={appData.initialData}
          config={{
            extraPlugins: [CommentsAdapter],
            licenseKey:
              "czMrQTQ0dGQwVjArRXdGSDV0S2h3ayt5cGxYTUV1enpOT0NuaTNNVUpBaUNWVWdhVHBGZjdGd21yYTdDLU1qQXlNekV5TWpRPQ==",
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
