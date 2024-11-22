import React from 'react';

interface VerificationUserTemplateProps {
  code: string;
}

export const VerificationUserTemplate: React.FC<VerificationUserTemplateProps> = ({
  code
}) => (
  <div>
    <h1>Код подтверждения: <h2>{code}</h2></h1>
		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
		</p>
  </div>
);
