export default function Spinner ({ state }) {

    return (
        <div id="spinner" className={`${state ? 'fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70' : 'hidden'}`}>
          {state ? (
            <div className="items-center">
              <img src="/spinner.svg" alt="spinner" />
              <span className="text-xl font-semibold ml-2">Por favor espere...</span>
            </div>
          ) : null}
        </div>
      )
}