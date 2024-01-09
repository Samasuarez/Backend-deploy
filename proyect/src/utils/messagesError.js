import passport from "passport"


export const passportError = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error)
            }

            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() }) 
            }

            req.user = user
            next()
        })(req, res, next) 
    }
}


export const authorization = (requiredRole) => {
    return (req, res, next) => {
      try {
        const userRole = req.user.rol;
  
        if (userRole === requiredRole || userRole === 'admin') {
        
          return next();
        } else {
          return res.status(403).send({ mensaje: "Acceso no autorizado" });
        }
      } catch (error) {
        return res.status(500).send({ mensaje: `Error en autorización: ${error.message}` });
      }
    };
  };
  