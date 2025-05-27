import GeneralData from "./NewOreders/GeneralData"
import GeneralDataProvider from "./NewOreders/GeneralDataContext"

export default function HomeShopping() {
    return (
        <div>
            <GeneralDataProvider>
                <GeneralData />
            </GeneralDataProvider>

            


        </div>
    )
}
