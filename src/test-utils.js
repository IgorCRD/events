export default function mockResolvesAfter(numberOfCalls, implementationCallback) {
  if (numberOfCalls <= 0) {
    throw new Error("Invalid argument: 'numberOfCalls' must be a positive integer");
  }

  let functionMock;
  const mockPromise = new Promise((resolve) => {
    functionMock = jest.fn(implementationCallback);
    for (let i = 0; i < numberOfCalls - 1; i += 1) {
      functionMock = functionMock.mockImplementationOnce(implementationCallback);
    }
    functionMock = functionMock.mockImplementationOnce((args) => {
      resolve();
      return implementationCallback && implementationCallback(args);
    });
  });
  mockPromise.mock = functionMock;

  return mockPromise;
}
