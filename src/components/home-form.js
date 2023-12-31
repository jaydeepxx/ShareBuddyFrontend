// eslint-disable-next-line

import React, { useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import { upload } from "../helpers/upload";
import PropTypes from "prop-types";

const HomeForm = ({ onUploadBegin, onUploadEvent }) => {
  const [form, setForm] = useState({
    files: [],
    to: "",
    from: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    to: null,
    from: null,
    message: null,
    files: null,
  });

  const _onFileRemove = (key) => {
    let updatedFiles = [...form.files];
    updatedFiles.splice(key, 1);
    setForm({ ...form, files: updatedFiles });
  };

  const _onFileAdded = (event) => {
    const files = [...form.files];
    _.each(_.get(event, "target.files", []), (file) => {
      files.push(file);
    });
    setForm({ ...form, files });
    _formValidation(["files"], (isValid) => {});
  };

  const _isEmail = (emailAddress) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; //eslint-disable-line
    return emailRegex.test(emailAddress);
  };

  const _formValidation = (fields = [], callback = () => {}) => {
    const validations = {
      from: [
        // {
        //   errorMessage: "From is required.",
        //   isValid: () => {
        //     return form.from.length;
        //   },
        // },
        {
          errorMessage: "Email is not valid.",
          isValid: () => {
            return _isEmail(form.from);
          },
        },
      ],
      to: [
        // {
        //   errorMessage: "To is required.",
        //   isValid: () => {
        //     return form.to.length;
        //   },
        // },
        {
          errorMessage: "Email is not valid.",
          isValid: () => {
            return _isEmail(form.to);
          },
        },
      ],
      files: [
        {
          errorMessage: "File is required.",
          isValid: () => {
            return form.files.length;
          },
        },
      ],
    };

    _.each(fields, (field) => {
      let fieldValidations = _.get(validations, field, []);
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));

      _.each(fieldValidations, (fieldValidation) => {
        const isValid = fieldValidation.isValid();
        if (!isValid) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: fieldValidation.errorMessage,
          }));
        }
      });
    });

    let isValid = true;
    _.each(errors, (err) => {
      if (err !== null) {
        isValid = false;
      }
    });
    callback(isValid);
  };

  const _onSubmit = (event) => {
    event.preventDefault();
   
    
        const data = form;
        if (onUploadBegin) {
          onUploadBegin(data);
        }
        upload(data, (event) => {
          if (onUploadEvent) {
            onUploadEvent(event);
          }
        });
      
    
  };

  // const _onTextChange = (event) => {
  //   const fieldName = event.target.name;
  //   const fieldValue = event.target.value;
  //   setForm((prevForm) => ({ ...prevForm, [fieldName]: fieldValue }));
  // };

  return (
    <div className={"app-card"}>
      <form onSubmit={_onSubmit}>
        <div className={"app-card-header "}>
          <div className={"app-card-header-inner"}>
            {form.files.length ? (
              <div className={"app-files-selected"}>
                {form.files.map((file, index) => (
                  <div key={index} className={"app-files-selected-item"}>
                    <div className={"filename"}>{file.name}</div>
                    <div className={"file-action"}>
                      <button
                        onClick={() => _onFileRemove(index)}
                        type={"button"}
                        className={"app-file-remove"}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div
              className={classNames("app-file-select-zone", {
                error: _.get(errors, "files"),
              })}
            >
              <label htmlFor={"input-file"}>
                <input
                  onChange={_onFileAdded}
                  id={"input-file"}
                  type="file"
                  multiple={true}
                />
                {form.files.length ? (
                  <span className={"app-upload-description text-uppercase"}>
                    Add more files
                  </span>
                ) : (
                  <span>
                    <span className={"app-upload-icon"}>
                      <i className={"icon-picture-streamline"} />
                    </span>
                    <span className={"app-upload-description"}>
                      <span role="img" aria-label="attach">
                        🔗
                      </span>{" "}
                      Click here to select file!
                    </span>
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className={"app-card-content"}>
          <div className={"app-card-content-inner"}>
            {/* <div
              className={classNames("app-form-item", {
                error: _.get(errors, "to"),
              })}
            >
              <label htmlFor={"to"}>Send to</label>
              <input
                onChange={_onTextChange}
                value={form.to}
                name={"to"}
                placeholder={
                  _.get(errors, "to") ? _.get(errors, "to") : "Email address"
                }
                type={"text"}
                id={"to"}
              />
            </div> */}

            {/* <div
              className={classNames("app-form-item", {
                error: _.get(errors, "from"),
              })}
            >
              <label htmlFor={"from"}>From</label>
              <input
                value={_.get(form, "from")}
                onChange={_onTextChange}
                name={"from"}
                placeholder={
                  _.get(errors, "from")
                    ? _.get(errors, "from")
                    : "Your email address"
                }
                type={"text"}
                id={"from"}
              />
            </div> */}

            {/* <div className={"app-form-item"}>
              <label htmlFor={"message"}>Message</label>
              <textarea
                value={_.get(form, "message", "")}
                onChange={_onTextChange}
                placeholder={"Add a note (optional)"}
                id={"message"}
                name={"message"}
              />
            </div> */}

            <div className={"app-form-actions"}>
              <button type={"submit"} className={"app-button primary"}>
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

HomeForm.propTypes = {
  onUploadBegin: PropTypes.func,
  onUploadEvent: PropTypes.func,
};

export default HomeForm;
