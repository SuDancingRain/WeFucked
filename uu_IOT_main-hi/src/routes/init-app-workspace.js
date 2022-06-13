//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useDataObject, Environment, useCall, useLsiValues, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Calls from "calls";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import LSI from "./config/init-app-workspace-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const RELATIVE_URI_REGEXP = new RegExp(/^\/[^/]/);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      maxWidth: 512,
      margin: "auto",
    }),
  input: () => Config.Css.css({ marginTop: 16 }),
  formControls: () =>
    Config.Css.css({
      marginTop: 24,
      textAlign: "right",
    }),
  savePending: () =>
    Config.Css.css({
      marginRight: 8,
    }),
  saveError: () => Config.Css.css({ margin: "0 auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
async function save(values) {
  let originalUrl = new URLSearchParams(window.location.search).get("originalUrl");
  let workspace = await Calls.initAndGetWorkspace(values);
  let redirectPath;
  if (workspace && workspace.artifactUri) {
    redirectPath = Environment.appBaseUri + "controlPanel";
  } else if (originalUrl && RELATIVE_URI_REGEXP.test(originalUrl)) {
    redirectPath = originalUrl;
  } else {
    redirectPath = Environment.appBaseUri;
  }
  window.location.replace(redirectPath);
  return new Promise(() => {}); // don't resolve - we'll keep form disabled until reload happens
}
//@@viewOff:helpers

let InitAppWorkspace = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InitAppWorkspace",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [nameState, setNameState] = useState({ value: "" });
    const [uuBtLocationUriState, setUuBtLocationUriState] = useState({ value: "" });

    const routeLsi = useLsiValues(LSI);
    const { state, data, errorData } = useDataObject({
      handlerMap: { load: Calls.loadIdentityProfiles },
    });
    const { state: saveState, errorData: saveErrorData, call: saveCall } = useCall(save);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let child;

    if (state === "error" || state === "errorNoData") {
      child = (
        <Plus4U5App.Error error={errorData?.error}>
          <Lsi lsi={LSI.notAuthorized} />
        </Plus4U5App.Error>
      );
    } else if (state === "pending" || state === "pendingNoData") {
      child = <Plus4U5App.SpaPending />;
    } else {
      if (Array.isArray(data.authorizedProfileList) && data.authorizedProfileList.length > 0) {
        const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
        child = (
          <div {...attrs} disabled={saveState === "pending" || saveState === "pendingNoData"}>
            <Uu5Elements.Block
              header={
                <Uu5Elements.Text category="story" segment="heading" type="h2">
                  <Lsi lsi={LSI.formHeader} />
                </Uu5Elements.Text>
              }
              info={<Lsi lsi={LSI.formHeaderInfo} />}
              collapsible={false}
            >
              <Uu5Forms.Text
                required
                name="uuBtLocationUri"
                className={Css.input()}
                label={routeLsi.uuBtLocationUriLabel}
                tooltip={routeLsi.uuBtLocationUriTooltip}
                {...uuBtLocationUriState}
                onChange={(e) => setUuBtLocationUriState({ value: e.data.value })}
                onError={(e) => {
                  let { feedback, message, messageParams } = e.data.errorList?.[0] || {};
                  setUuBtLocationUriState((state) => ({ ...state, feedback, message, messageParams }));
                }}
              />
              <Uu5Forms.Text
                name="name"
                className={Css.input()}
                label={routeLsi.nameLabel}
                onChange={(e) => setNameState({ value: e.data.value })}
                onError={(e) => {
                  let { feedback, message, messageParams } = e.data.errorList?.[0] || {};
                  setNameState((state) => ({ ...state, feedback, message, messageParams }));
                }}
              />
              <div className={Css.formControls()}>
                <Uu5Elements.Button
                  colorScheme="primary"
                  onClick={() => {
                    if (uuBtLocationUriState.feedback || !uuBtLocationUriState.value || nameState.feedback) return;
                    saveCall({ uuBtLocationUri: uuBtLocationUriState.value, name: nameState.value });
                  }}
                >
                  {saveState === "pending" || saveState === "pendingNoData" ? (
                    <Uu5Elements.Pending size="xs" className={Css.savePending()} />
                  ) : null}
                  <Lsi lsi={LSI.initialize} />
                </Uu5Elements.Button>
              </div>
            </Uu5Elements.Block>

            {saveState === "error" || saveState === "errorNoData" ? (
              <Plus4U5App.Error error={saveErrorData?.error} className={Css.saveError()} />
            ) : null}
          </div>
        );
      } else {
        child = (
          <Plus4U5App.Error>
            <Lsi lsi={LSI.notAuthorizedForInit} />
          </Plus4U5App.Error>
        );
      }
    }
    return (
      <>
        <RouteBar />
        {child}
      </>
    );
  },
  //@@viewOff:render
});

InitAppWorkspace = withRoute(InitAppWorkspace, { authenticated: true });

//@@viewOn:exports
export { InitAppWorkspace };
export default InitAppWorkspace;
//@@viewOff:exports
