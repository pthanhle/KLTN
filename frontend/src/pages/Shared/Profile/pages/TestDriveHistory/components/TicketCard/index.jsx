import TicketVisual from './TicketVisual';
import TicketDetails from './TicketDetails';
import TicketActions from './TicketActions';

const TicketCard = ({ drive, handleReschedule, handleCancel, t }) => {
    return (
        <div className="w-full bg-white dark:bg-[#141416] rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col xl:flex-row min-h-[280px] transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1">
            <TicketVisual 
                carName={drive.carDetails?.name} 
                carImage={drive.carDetails?.image} 
                t={t} 
            />
            
            <TicketDetails 
                drive={drive} 
                t={t} 
            />
            
            <TicketActions 
                status={drive.status} 
                id={drive._id} 
                handleReschedule={handleReschedule} 
                handleCancel={handleCancel} 
                t={t} 
            />
        </div>
    );
};

export default TicketCard;
