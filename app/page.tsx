import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { MonacoEditor } from "@/components/Editor";
import { Output } from "@/components/Output";
import { AiComposer } from "@/components/AiComposer";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <Background>
      <div className="h-screen flex flex-col dark overflow-hidden">
        {/* Navbar with Spotify Player */}
        <div className="h-12">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-6 flex flex-col overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Editor Panel */}
            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
              <div className="flex-1 mb-4 overflow-hidden">
                <MonacoEditor />
              </div>

              {/* Output Panel (moved below editor) */}
              <div className="h-1/4 mb-2 overflow-auto">
                <Output />
              </div>
            </div>

            {/* Right Panel (AI Assistant only) */}
            <div className="lg:col-span-1 h-full overflow-hidden  ">
              <div className="h-2/3  max-w-[450px] mx-auto lg:max-w-none overflow-auto pb-2">
                <AiComposer />
              </div>
              <div className="h-1/3  max-w-[450px] mx-auto lg:max-w-none overflow-auto pb-2">
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
