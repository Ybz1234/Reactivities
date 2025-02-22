using Application.Core;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
             private readonly DataContext _context;
             private readonly IUserAccessor _accessor;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                _context = context;
                _accessor = accessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _accessor.GetUsername());

                if (user == null) return null;
                
                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);
                
                if (attendance == null)
                {
                    activity.Attendees.Add(new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    });
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}