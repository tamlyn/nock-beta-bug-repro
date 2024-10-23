import nock, {BackContext, BackMode} from "nock";
import path from "path";

// callback must be called after each test
let currentNock: null | { nockDone: () => void; context: BackContext };
const endCurrentNock = () => {
  if (currentNock) {
    const lastNock = currentNock;
    currentNock = null;
    // persist recorded API requests
    lastNock.nockDone();
    // throw if some recordings were not used,
    // but only if there are no pending errors from the test
    if (!expect.getState().suppressedErrors.length) {
      lastNock.context.assertScopesFinished();
    }
  }
};

afterEach(endCurrentNock);

/**
 * Set up Nock Back to create or use an HTTP recording.
 * Use the `yarn test:record` command to update or record new requests.
 *
 * @param name If not set, the file is named after the current test
 */
export function setupHttpRecording(name: string) {
  endCurrentNock();

  const { testPath } = expect.getState();
  const fixturesDirName = testPath ? path.dirname(testPath) : "./src/fixtures";
  const fixtureName = name;

  nock.back.fixtures = `${fixturesDirName}/http-recordings`;
  nock.back.setMode((process.env.NOCK_BACK_MODE as BackMode) || "lockdown");

  return nock
    .back(`${fixtureName}.json`)
    .then((_nock) => {
      currentNock = _nock;
    });
}
