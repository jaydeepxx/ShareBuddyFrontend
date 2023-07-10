import React, { useEffect, useState } from "react";
import { getDownloadInfo } from "../helpers/download";
// import { apiUrl } from "../config";
import { betterNumber } from "../helpers";
import { withRouter } from "react-router-dom";



const View = ({ history, match }) => {
  const { id } = match.params;
  const [post, setPost] = useState(null);

  const [copySuccess, setCopySuccess] = useState("");

  // your function to copy here

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  const handleSendAnotherFile = () => {
    window.location.href = `/`;
    // if (onSendAnotherFile) {
    //   onSendAnotherFile(true);
    // }
  };

  useEffect(() => {
    getDownloadInfo(id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log("An error occurred while fetching download data", err);
      });
  }, [id]);

  // const getTotalDownloadSize = () => {
  //   let total = 0;
  //   const files = post && post.files ? post.files : [];

  //     return post.size;
  //   files.forEach((file) => {
  //     total += file.size || 0;
  //   });

  //   return total;
  // };

  // const handleDownloadAll = () => {
  //   const postId = post && post._id;
  //   if (postId) {
  //     window.location.href = `${apiUrl}/posts/${post.name}/download`;
  //   }
  // };

  if (!post) {
    return null; // Render loading state or error message
  }

  // const files = post.files || [];
  const totalSize = betterNumber(post.size);

  return (
    <div className="app-page-download">
      <div className="app-top-header">
        <h1 onClick={() => history.push("/")}>
          <i className="icon-paper-plane" /> SHARE
        </h1>
      </div>
      <div className="app-card app-card-download">
        <div className="app-card-content">
          <div className="app-card-content-inner">
            <div className="app-download-icon">
              <i className="icon-download" />
            </div>
            <div className="app-download-message app-text-center">
              <h2>Ready to download</h2>
              <ul>
                {/* <li>{post.length} files</li> */}
                <li>{totalSize}</li>
                <li>Expires in 30 days</li>
              </ul>
            </div>
            <div className="app-download-file-list">
              <div className="app-download-file-list-item">
                <div className="filename">{post.originalName}</div>
                <div className="download-action">
                  <a href={`${post.url}`}>Download</a>
                </div>
              </div>
            </div>
            <div className="app-download-actions app-form-actions">
              <button
                className="app-button primary"
                onClick={() => copyToClipBoard(`${post.url}`)}
              >
                Click Here To Copy Url
              </button>
              <button
                onClick={handleSendAnotherFile}
                className="app-button"
                type="button"
              >
                Send another file
              </button>
              <div className="app-download-message app-text-center">
                <h2>{copySuccess}</h2>
              </div>
              {/* <button className="app-button" type="button">
                Share
              </button> */}
              {/* // after copying see the message here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(View);
