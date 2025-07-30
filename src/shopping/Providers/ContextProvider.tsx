import ProviderContextProvider from './ProvidersContext';
import Providers from "./Providers";

export default function ContextProvider() {
  return (
    <ProviderContextProvider>
      <Providers />
    </ProviderContextProvider>
  )
}
