import clsx from 'clsx';
import Balancer from 'react-wrap-balancer';

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = 'user' | 'system' | 'assistant';

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
  image?: string; // New prop for the image source
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            Decaf
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

  export function ChatLine({ role = 'assistant', content, image }: ChatGPTMessage) {
    if (!content) {
      return null;
    }
    const formatteMessage = convertNewLines(content);
  
    return (
      <div
        className={
          role !== 'assistant' ? 'float-right clear-both' : 'float-left clear-both'
        }
      >
        <BalancerWrapper>
          <div
            className={
              role !== 'assistant'
                ? 'float-right mb-5 rounded-lg px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6 bg-gradient-to-r from-violet-100 to-white-300'
                : 'float-left mb-5 rounded-lg px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6 bg-gradient-to-r from-white to-violet-100'
            }
          >
            <div className="flex space-x-3">
              {role === 'assistant' && (
                <div className="flex-shrink-0">
                  {image && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={image}
                      alt="User Avatar"
                    />
                  )}
                </div>
              )}
              <div className="flex-1 gap-4">
                <p className="font-large text-xxl text-gray-900">
                  <a href="#" className="hover:underline">
                    {role === 'assistant' ? 'Decaf AI' : 'You'}
                  </a>
                </p>
                <p
                  className={clsx(
                    'text',
                    role === 'assistant' ? 'font-semibold font-' : 'text-black font-medium'
                  )}
                >
                  {formatteMessage}
                </p>
              </div>
            </div>
          </div>
        </BalancerWrapper>
      </div>
    );
  }
  
  