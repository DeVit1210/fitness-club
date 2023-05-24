const todayDate = new Date(Date.now());
$.ajax({
    url: "http://localhost:8080/confirmed-membership",
    type: "GET",
    success: (memberships) => {
        memberships
            .filter(membership => membership.__t !== 'ConfirmedVisitMembership')
            .forEach(membership => {
                const membershipStartDate = new Date(membership.dateFrom);
                const membershipEndDate = new Date(membership.dateTo);
                if(todayDate.getDate() >= membershipStartDate.getDate() && todayDate.getDate() <= membershipEndDate.getDate()) {
                    membership.status = 'active';
                } else if(todayDate.getDate() > membershipEndDate.getDate()) {
                    membership.status = 'expired';
                }
            })
    }
})